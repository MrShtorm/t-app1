pipeline {
    agent { label '!master' }
    stages {
        stage('Checkout') {
            steps{
                git branch: 'main',
                url: 'https://github.com/MrShtorm/t-app.git'
            }
        }
        stage('Docker build') {
            steps{
                    sh 'docker build -t t-app .'
            }    
        }
        stage('Docker compose down') {
            steps{
                    sh 'docker compose down'
            }    
        }
        stage('Docker compose up -d') {
            steps{
                    sh 'docker compose up -d'
            }    
        }
    }
}
