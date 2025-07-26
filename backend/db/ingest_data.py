import pandas as pd
from config.db_config import get_connection

def insert_data_from_csv(csv_path, table_name):
    conn = get_connection()
    cursor = conn.cursor()
    df = pd.read_csv(csv_path)

    placeholders = ", ".join(["%s"] * len(df.columns))
    columns = ", ".join(df.columns)

    sql = f"INSERT INTO {table_name} ({columns}) VALUES ({placeholders})"

    for _, row in df.iterrows():
        cursor.execute(sql, tuple(row))

    conn.commit()
    cursor.close()
    conn.close()
    print(f"Inserted data into {table_name}.")

def main():
    tables = {
        "distribution_centers": "csv_files/distribution_centers.csv",
        "products": "csv_files/products.csv",
        "inventory_items": "csv_files/inventory_items.csv",
        "users": "csv_files/users.csv",
        "orders": "csv_files/orders.csv",
        "order_items": "csv_files/order_items.csv",
    }

    for table, path in tables.items():
        insert_data_from_csv(path, table)

if __name__ == "__main__":
    main()
