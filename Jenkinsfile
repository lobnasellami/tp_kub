pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('dockerCredentials')
        DOCKER_IMAGE_NAME = 'lobnasellami/devopstp'
        DOCKER_IMAGE_TAG = 'latest'
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
                    def dockerImage = docker.build("${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}")
                }
            }
        }

        stage("Push to Docker Hub") {
            steps {
                script {
                    echo "======== executing ========"
                    echo "push to hub"
                    docker.withRegistry("${DOCKER_HUB_CREDENTIALS}") {
                        def dockerImage = docker.image("${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}")
                        dockerImage.push()
                    }
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
