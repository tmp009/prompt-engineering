from openai import OpenAI 
import os, sys

import dotenv
dotenv.load_dotenv(dotenv_path=dotenv.find_dotenv())


openai_key = os.environ.get('OPENAI_API_KEY')

if not openai_key: 
    print('OPENAI_API_KEY ei löytyy')
    exit(0)

if len(sys.argv) < 2:
    print(f'{sys.argv[0]} <teksti>')
    exit(0)

text = sys.argv[1]
client = OpenAI(api_key=openai_key)

print('Odota hetki...')

completion = client.chat.completions.create(
    messages=[
        {
            "role":"system",
            "content":"You are a summarizer. You will summarize a given text by the user. You will answer in Finnish."
        },
                {
            "role":"user",
            "content":f"If you can't summarize the text then reply with \"En pystyy tiivistää tekstiä.\""
        },
        {
            "role":"user",
            "content":f"Summarize into three key points: {text}"
        }
            ],
    model='gpt-4'
)

print(completion.choices[0].message.content)