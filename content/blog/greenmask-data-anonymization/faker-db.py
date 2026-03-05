import random
from faker import Faker
import psycopg2
from psycopg2 import sql, IntegrityError
import sys

# Initialize Faker
fake = Faker()

# Database connection parameters - UPDATE THESE WITH YOUR DETAILS
DB_CONFIG = {
    'dbname': 'appdb',     # Replace with your database name
    'user': 'postgres',             # Replace with your PostgreSQL username
    'password': '',         # Replace with your password
    'host': 'localhost',                  # Usually localhost
    'port': 5432                           # Default PostgreSQL port
}

def create_connection():
    """Create database connection"""
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        print("✅ Connected to PostgreSQL successfully!")
        return conn
    except Exception as e:
        print(f"❌ Error connecting to database: {e}")
        return None

def create_table_if_not_exists(conn):
    """Create the app_user table if it doesn't exist"""
    try:
        cursor = conn.cursor()
        
        # Check if table exists
        cursor.execute("""
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'app_user'
            );
        """)
        table_exists = cursor.fetchone()[0]
        
        if not table_exists:
            print("📦 Creating app_user table...")
            cursor.execute("""
                CREATE TABLE app_user (
                    id SERIAL PRIMARY KEY,
                    first_name VARCHAR(100) NOT NULL,
                    last_name VARCHAR(100) NOT NULL,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    username VARCHAR(100) NOT NULL UNIQUE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    is_active BOOLEAN DEFAULT true
                )
            """)
            conn.commit()
            print("✅ Table created successfully!")
        else:
            print("📦 Table 'app_user' already exists")
        
        cursor.close()
        
    except Exception as e:
        print(f"❌ Error creating table: {e}")
        conn.rollback()
        sys.exit(1)

def generate_user_data(num_entries=20):
    """Generate random user data"""
    users = []
    used_emails = set()
    used_usernames = set()
    
    print(f"👥 Generating {num_entries} users...")
    
    # Common email domains
    email_domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'protonmail.com']
    
    for i in range(num_entries):
        first_name = fake.first_name()
        last_name = fake.last_name()
        
        # Generate unique email
        while True:
            # Randomly choose email format
            format_type = random.randint(1, 5)
            
            if format_type == 1:
                email = f"{first_name.lower()}.{last_name.lower()}@{random.choice(email_domains)}"
            elif format_type == 2:
                email = f"{first_name.lower()[0]}{last_name.lower()}@{random.choice(email_domains)}"
            elif format_type == 3:
                email = f"{first_name.lower()}{last_name.lower()}@{random.choice(email_domains)}"
            elif format_type == 4:
                email = f"{first_name.lower()}_{last_name.lower()}@{random.choice(email_domains)}"
            else:
                email = f"{first_name.lower()}{random.randint(1, 999)}@{random.choice(email_domains)}"
            
            if email not in used_emails:
                used_emails.add(email)
                break
        
        # Generate unique username
        while True:
            username_formats = [
                f"{first_name.lower()}{last_name.lower()}{random.randint(1, 99)}",
                f"{first_name.lower()}.{last_name.lower()}",
                f"{first_name.lower()[0]}{last_name.lower()}",
                f"{first_name.lower()}{random.randint(10, 999)}",
                f"{first_name[:3].lower()}{last_name[:3].lower()}{random.randint(1, 99)}"
            ]
            username = random.choice(username_formats)
            
            # Trim if too long
            if len(username) > 30:
                username = username[:30]
            
            if username not in used_usernames:
                used_usernames.add(username)
                break
        
        users.append({
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'username': username,
            'is_active': random.choice([True, True, True, False])  # 75% active
        })
        
        # Show progress
        if (i + 1) % 10 == 0 or (i + 1) == num_entries:
            print(f"  Generated {i + 1}/{num_entries} users...")
    
    return users

def insert_users(conn, users):
    """Insert users into database"""
    try:
        cursor = conn.cursor()
        
        # Insert each user
        inserted = 0
        skipped = 0
        
        for user in users:
            try:
                cursor.execute("""
                    INSERT INTO app_user (first_name, last_name, email, username, is_active)
                    VALUES (%s, %s, %s, %s, %s)
                """, (
                    user['first_name'],
                    user['last_name'],
                    user['email'],
                    user['username'],
                    user['is_active']
                ))
                inserted += 1
            except IntegrityError as e:
                # Handle duplicate email or username
                if "email" in str(e).lower():
                    print(f"⚠️ Skipped duplicate email: {user['email']}")
                elif "username" in str(e).lower():
                    print(f"⚠️ Skipped duplicate username: {user['username']}")
                else:
                    print(f"⚠️ Skipped due to duplicate: {user['email']}")
                conn.rollback()
                skipped += 1
                continue
        
        # Commit all successful inserts
        conn.commit()
        cursor.close()
        
        print(f"✅ Successfully inserted: {inserted} users")
        if skipped > 0:
            print(f"⚠️ Skipped duplicates: {skipped} users")
        
        return inserted
        
    except Exception as e:
        print(f"❌ Error inserting data: {e}")
        conn.rollback()
        return 0

def verify_data(conn):
    """Verify the inserted data"""
    try:
        cursor = conn.cursor()
        
        # Get total count
        cursor.execute("SELECT COUNT(*) FROM app_user")
        count = cursor.fetchone()[0]
        
        print(f"\n📊 Database Summary:")
        print(f"Total users in table: {count}")
        
        if count > 0:
            # Show sample data
            cursor.execute("""
                SELECT id, first_name, last_name, email, username, is_active, 
                       TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS') as created
                FROM app_user 
                ORDER BY id 
                LIMIT 5
            """)
            
            rows = cursor.fetchall()
            
            if rows:
                print("\n📝 Sample data (first 5 rows):")
                print("-" * 100)
                for row in rows:
                    print(f"ID: {row[0]:3} | Name: {row[1]} {row[2]:15} | Email: {row[3]:25} | Username: {row[4]:15} | Active: {row[5]} | Created: {row[6]}")
                print("-" * 100)
            
            # Get some statistics
            cursor.execute("""
                SELECT 
                    COUNT(*) as total,
                    SUM(CASE WHEN is_active THEN 1 ELSE 0 END) as active_count,
                    MIN(created_at) as oldest,
                    MAX(created_at) as newest
                FROM app_user
            """)
            
            stats = cursor.fetchone()
            active_pct = (stats[1] / stats[0] * 100) if stats[0] > 0 else 0
            print(f"\n📈 Statistics:")
            print(f"  • Active users: {stats[1]} ({active_pct:.1f}%)")
            print(f"  • Inactive users: {stats[0] - stats[1]} ({100 - active_pct:.1f}%)")
            print(f"  • Oldest user: {stats[2]}")
            print(f"  • Newest user: {stats[3]}")
        
        cursor.close()
        
    except Exception as e:
        print(f"❌ Error verifying data: {e}")

def main():
    """Main function"""
    print("=" * 60)
    print("🚀 PostgreSQL User Data Generator")
    print("=" * 60)
    
    # Check if script is named faker.py (which would cause issues)
    if sys.argv[0].endswith('faker.py'):
        print("\n❌ ERROR: Your script is named 'faker.py'")
        print("This conflicts with the Faker module.")
        print("\n💡 Please rename your script to something else, e.g.:")
        print("   mv faker.py generate_users.py")
        print("   python generate_users.py")
        sys.exit(1)
    
    # Ask for number of entries
    try:
        user_input = input("\nHow many users to generate? (default: 20, max: 100): ").strip()
        num_entries = int(user_input) if user_input else 20
        num_entries = max(1, min(100, num_entries))  # Limit between 1-100
        print(f"📝 Will generate {num_entries} users")
    except ValueError:
        num_entries = 20
        print(f"📝 Using default: {num_entries} users")
    
    # Ask for database confirmation
    print("\n🔧 Database Configuration:")
    print(f"  Database: {DB_CONFIG['dbname']}")
    print(f"  Host: {DB_CONFIG['host']}:{DB_CONFIG['port']}")
    print(f"  User: {DB_CONFIG['user']}")
    
    confirm = input("\nProceed with these settings? (y/n): ").strip().lower()
    if confirm != 'y':
        print("❌ Operation cancelled")
        sys.exit(0)
    
    # Connect to database
    conn = create_connection()
    
    # Create table if it doesn't exist
    create_table_if_not_exists(conn)
    
    # Generate data
    users = generate_user_data(num_entries)
    
    # Insert data
    inserted = insert_users(conn, users)
    
    # Verify results
    if inserted > 0:
        verify_data(conn)
    
    # Clean up
    conn.close()
    print("\n👋 Done! Database connection closed.")

if __name__ == "__main__":
    main()