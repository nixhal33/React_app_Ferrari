pipeline {
    agent any
    stages{
        stage("Code Clone") {
            steps{
                git branch: 'main', url: 'https://github.com/nixhal33/React_app_Ferrari.git' 
            }
        }
        stage("Deploy Docker Images") {
            steps{
                sh "docker compose up --build --force-recreate -d" 
            }
        }
    }
}