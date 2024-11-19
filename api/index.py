from collections import defaultdict
from fastapi import FastAPI, Query
import pandas as pd
from rapidfuzz import process
from pathlib import Path

# Get the folder where this script is located
current_folder = Path(__file__).resolve().parent
csv_file_path = current_folder / "The-Office-Lines-V4.csv"

df = pd.read_csv(csv_file_path)
df = df.drop("Unnamed: 6", axis=1)

### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

@app.get("/api/py/helloFastApi")
def hello_fast_api():
    return {"message": "Hello from FastAPI"}

@app.post("/api/py/rapidfuzz")
def rapidfuzz(query:str, limit:int):
    res = process.extract(query, choices=df["line"], limit=limit)
    return_body = {}
    for i, result in enumerate(res):
        line, score, row = result
        season,episode,title,scene,speaker,line = df.loc[row].tolist()
        return_body[i] = {
            "season": int(season),  # Ensure it's a Python int
            "episode": int(episode),
            "title": str(title),
            "scene": int(scene),
            "speaker": str(speaker),
            "line": str(line),
            "score": int(score)
        }
    return return_body

@app.get("/api/py/get-table")
async def get_data(
    season: int = Query(None), 
    episode: int = Query(None), 
    title: str = Query(None), 
    scene: int = Query(None), 
    speaker: str = Query(None)
):
    filtered_df = df

    # Apply filters
    if season is not None:
        filtered_df = filtered_df[filtered_df['season'] == season]
    if episode is not None:
        filtered_df = filtered_df[filtered_df['episode'] == episode]
    if title:
        filtered_df = filtered_df[filtered_df['title'].str.contains(title, case=False)]
    if scene is not None:
        filtered_df = filtered_df[filtered_df['scene'] == scene]
    if speaker:
        filtered_df = filtered_df[filtered_df['speaker'].str.contains(speaker, case=False)]

    # Convert data to native Python types
    filtered_data = filtered_df.astype(object).to_dict(orient="records")

    return filtered_data