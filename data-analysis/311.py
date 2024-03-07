import pandas as pd
import os

dir_path = os.path.dirname(os.path.realpath(__name__))
data_311_csv = os.path.join(dir_path, "311_feb23_feb24.csv")
df = pd.read_csv(data_311_csv)

# Group the data by Agency and Agency Name
grouped_data = df.groupby(["Agency", "Agency Name"]).size().reset_index(name="Count")

# Display the first few rows of the grouped data
print(grouped_data.head())

# Convert the 'Created Date' and 'Closed Date' columns to datetime
df["Created Date"] = pd.to_datetime(df["Created Date"])
df["Closed Date"] = pd.to_datetime(df["Closed Date"])

# Calculate the difference in days between 'Created Date' and 'Closed Date'
df["Days to Close"] = (df["Closed Date"] - df["Created Date"]).dt.days

# Group the data by Agency and calculate the average days to close
avg_days_to_close = (
    df.groupby("Agency")["Days to Close"].mean().reset_index(name="Avg Days to Close")
)

# Display the first few rows of the average days to close data
print(avg_days_to_close.head())
