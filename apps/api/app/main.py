import logging
import time
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from prometheus_client import make_asgi_app
from pythonjsonlogger import jsonlogger

# Logger setup
logger = logging.getLogger("patterns-api")
logHandler = logging.StreamHandler()
formatter = jsonlogger.JsonFormatter()
logHandler.setFormatter(formatter)
logger.addHandler(logHandler)
logger.setLevel(logging.INFO)

app = FastAPI(title="Container App Patterns API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Metrics
metrics_app = make_asgi_app()
app.mount("/metrics", metrics_app)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time
    logger.info(f"Path: {request.url.path} Duration: {duration:.4f}s Status: {response.status_code}")
    return response

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.get("/patterns")
def get_patterns():
    return [
        {"id": "stateless-web", "name": "Stateless Web App", "category": "Core", "complexity": "Low"},
        {"id": "event-driven", "name": "Event-Driven Worker", "category": "Asynchronous", "complexity": "Medium"},
        {"id": "sidecar-proxy", "name": "Sidecar Proxy (Service Mesh)", "category": "Advanced", "complexity": "High"},
        {"id": "bff", "name": "Backend-for-Frontend (BFF)", "category": "Mobile/Web", "complexity": "Medium"}
    ]

@app.get("/patterns/{id}")
def get_pattern_detail(id: str):
    patterns = {
        "stateless-web": {
            "description": "Standard horizontal scaling model for web apps.",
            "iac_template": "terraform/modules/aca",
            "k8s_manifest": "k8s/manifests/stateless-app.yaml"
        }
    }
    return patterns.get(id, {"error": "Pattern not found"})

@app.get("/recommendations")
def get_recommendations():
    return [
        {"target": "Azure Container Apps", "reason": "Best for low-complexity, high-velocity teams."},
        {"target": "AKS / Kubernetes", "reason": "Best for complex, multi-container orchestrations."}
    ]

@app.get("/dashboard/summary")
def get_dashboard_summary():
    return {
        "active_patterns": 45,
        "supported_runtimes": ["AKS", "EKS", "ACA", "ECS", "Cloud Run"],
        "governance_score": "98%",
        "latest_release": "v1.0.0"
    }
