from pydantic_settings import BaseSettings


class Settings(BaseSettings): # class for application settings which will be loaded from environment variables or .env file

    MONGO_URL: str
    DATABASE_NAME: str = "chat_app"

    class Config:
        env_file = ".env"


settings = Settings()