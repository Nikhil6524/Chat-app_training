#redis intialization from container which is in docker-compose.yml file. 
import redis

redis_client = redis.Redis(
    host="redis",   
    port=6379,
    decode_responses=True
)