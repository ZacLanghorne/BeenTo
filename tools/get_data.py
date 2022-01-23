import json
import pandas as pd

with open('tools/raw.json') as file:
    data = json.load(file)

countries = [country["properties"] for country in data["geometries"]]

df = pd.DataFrame(countries).rename({"ISO_A3": "ISO3"}, axis=1)
df = df.sort_values(["CONTINENT","NAME"])
df.to_csv("public/countries.csv", index=False)
