pipeline {
    agent any
    // environment {
    //     DOCKERHUB_CREDENTIALS = credentials('dockerhub') not required current
    // } DOCKER IMAGES MUST BE PULLED FROM kubenix docker hub
    stages {
        stage("Clone code") {
            steps {
                echo "cloning"
                git branch: 'main', credentialsId: 'github', url: 'https://github.com/nixhal33/React_app_Ferrari.git'
            }
        }
        stage("Build Image") {
            steps {
                echo "Building"
                sh "docker build -t ferrari-carapp:dev"
            }
        }
        stage("Push Image to repository") {
            steps {
                echo "Pushing Image"
                withCredentials([usernamePassword(credentialsId:"docker", passwordVariable:"password", usernameVariable:"user")]){
                    sh "docker tag ecom-webapp ${env.user}/ferrari-carapp:dev:dev"
                    sh "docker login -u ${env.user} -p ${env.password}"
                    sh "docker push ${env.user}/ferrari-carapp:dev"
                }
            }
        }
        stage("ssh into server") {
            steps {
                sshagent(['ssh-deployment']) {
                    sh 'ssh -o StrictHostKeyChecking=no ubuntu@18.205.25.122 "cd /home/ubuntu/ferrari-carapp && docker compose up --force-recreate -d"'
                }
            }
        }
    }
}