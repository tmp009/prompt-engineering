# modified from https://cookbook.openai.com/examples/question_answering_using_embeddings

import ast
from openai import OpenAI 
import pandas as pd 
import os 
from scipy import spatial 

import dotenv
import sys

dotenv.load_dotenv(dotenv_path=dotenv.find_dotenv())

EMBEDDING_MODEL = "text-embedding-3-small"
GPT_MODEL = "gpt-4"

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

embeddings_path = "https://public.bc.fi/s2200767/faqai/faq_embedding.csv"


df = pd.read_csv(embeddings_path)
df['embedding'] = df['embedding'].apply(ast.literal_eval)

def strings_ranked_by_relatedness(query: str, df: pd.DataFrame, relatedness_fn=lambda x, 
                                  y: 1 - spatial.distance.cosine(x, y), top_n: int = 100
                                  ) ->tuple[list[str], list[float]]:
    """Returns a list of strings and relatednesses, sorted from most related to least."""
    query_embedding_response = client.embeddings.create(
        model=EMBEDDING_MODEL,
        input=query,
    )
    query_embedding = query_embedding_response.data[0].embedding
    
    strings_and_relatednesses = [
        (row['question'], row['answer'],  relatedness_fn(query_embedding, row["embedding"])) for _, row in df.iterrows()
    ]
    strings_and_relatednesses.sort(key=lambda x: x[1], reverse=True)
    questions, answers, relatednesses = zip(*strings_and_relatednesses)
    return questions[:top_n], answers[:top_n], relatednesses[:top_n], 



def ask(prompt):
    faq = []
    questions, answers, _ = strings_ranked_by_relatedness(prompt, df, top_n=10)
    for question, answer in zip(questions, answers):
        faq_string = f"""Q: {question}
A: {answer}"""
        
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

if (len(sys.argv) < 2):
    print('python embedding.py <question>')
    exit(0)
ask(sys.argv[1])