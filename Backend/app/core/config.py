from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    MONGO_URL: str
    DATABASE_NAME: str = "chat_app"

    class Config:
        env_file = ".env"


settings = Settings()