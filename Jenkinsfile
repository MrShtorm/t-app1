pipeline {
    agent { label '!master' }
    environment{
        TOKEN_ID=credentials('TOKEN_ID')
        CHAT_ID=credentials('CHAT_ID')
    }
    stages {
        stage('Checkout main') {
            steps{
                git branch: 'main',
                url: 'git@github.com:MrShtorm/t-app1.git',
                credentialsId: 't-app_git'
            }
        }
         stage('Checkout ci') {
            steps {
                dir('ci-files') {
                    git branch: 'ci',
                        url: 'git@github.com:MrShtorm/t-app1.git',
                        credentialsId: 't-app_git'
                }
            }
        }
        stage('Copy Dockerfile') {
            steps {
                sh 'cp ci-files/Dockerfile .'
            }
        }
        stage('Docker build') {
            steps{
                    sh 'docker build -t t-app1 .'
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
        post {
        always {
            cleanWs()
        }
        success {
            sh  ("""
                        curl -s -X POST https://api.telegram.org/bot\${TOKEN_ID}/sendMessage -d chat_id=\${CHAT_ID} -d parse_mode=MarkdownV2 -d text='*Job*: `${env.JOB_NAME}#${env.BUILD_NUMBER}`\n*Build url*: `${env.BUILD_URL}`\n*STATUS*: `SUCCESS`'
                   """)
        }
        aborted {
            sh  ("""
                        curl -s -X POST https://api.telegram.org/bot\${TOKEN_ID}/sendMessage -d chat_id=\${CHAT_ID} -d parse_mode=MarkdownV2 -d text='*Job*: `${env.JOB_NAME}#${env.BUILD_NUMBER}`\n*Build url*: `${env.BUILD_URL}`\n*STATUS*: `ABORTED`'
                    """)
        }
        failure {
            sh  ("""
                        curl -s -X POST https://api.telegram.org/bot\${TOKEN_ID}/sendMessage -d chat_id=\${CHAT_ID} -d parse_mode=MarkdownV2 -d text='*Job*: `${env.JOB_NAME}#${env.BUILD_NUMBER}`\n*Build url*: `${env.BUILD_URL}`\n*STATUS*: `FAILURE`'
                    """)
        }
    }
}
