import sys
from elasticsearch import Elasticsearch
from openai import OpenAI

import dotenv
import os

dotenv.load_dotenv(dotenv_path=dotenv.find_dotenv())

GPT_MODEL = "gpt-4"

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))



USERNAME = os.environ.get('USER')
PASSWORD = os.environ.get('PASSWORD')

# Connect to Elasticsearch
es = Elasticsearch(
  "https://localhost:9200",
  basic_auth=(USERNAME, PASSWORD), ca_certs='http_ca.crt'
)

if (len(sys.argv) < 2):
    print('python faq.py <question>')
    exit(0)

question = sys.argv[1]

search_results = es.search(index="faq", body={
    "query": {
        "match": {
            "question": {
                "query": question,
                "fuzziness": "AUTO" 
            }
        }
    },
    "size": 100  
})

def ask(prompt):
    faq = []
    for hit in search_results['hits']['hits']:
        faq_string = f"""Q: {hit['_source']['question']}
A: {hit['_source']['answer']}"""
        
        faq.append(faq_string)

    response = client.chat.completions.create(
        model=GPT_MODEL,
        messages=[
            { "role": "system", "content": "You will answer the users question only using the FAQ given to you. Do not use any other information"}, 
            { "role": "system", "content": "Here's the FAQ: " + '\n'.join(faq)}, 
            { "role": "user", "content": prompt}
        ],
        temperature=0.7
    )

    print(response.choices[0].message.content)



ask(question)