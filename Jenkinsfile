pipeline {
    agent any

    environment {
        DOCKER_HUB_PASSWORD = credentials('docker_pass')
    }

    stages {
        stage("Getting Code") {
            steps {
                git url: 'https://github.com/lobnasellami/tp_kub.git', branch: 'master',
                credentialsId: 'github-credentials'
            }
        }

        stage("Build Docker Image") {
            steps {
                script {
                sh 'docker build -t lobnasellami/jenkins-pipeline:latest .'

                    
                }
            }
        }

        stage("Push to Docker Hub") {
            steps {
                script {
                    echo "======== executing ========"
                    echo "push to hub"
                 sh 'docker login -u lobnasellami -p $DOCKER_HUB_PASSWORD'
                 sh 'docker push lobnasellami/jenkins-pipeline:latest'


                }
            }
        }

        stage('Deploying App to Kubernetes') {
            steps {
                script {
                    kubernetesDeploy(configs: "deploymentservice.yml", kubeconfigId: "kubernetes")
                }
            }
        }
    }
}
