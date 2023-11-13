pipeline {
    agent any

    environment {
        DOCKER_HUB_PASSWORD = credentials('docker_pass')
        KUBE_CONFIG_FILE = credentials('mykubeConfig')
        BUILD_TAG = "${BUILD_NUMBER}"
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
                         docker.withRegistry('https://registry-1.docker.io/v1/', 'docker_pass') {
                        def dockerImage = docker.image("lobnasellami/jenkins-pipeline:latest")
                        dockerImage.push()}


                }
            }
        }

        stage('Deploying App to Kubernetes') {
            steps {
                script {
                    kubernetesDeploy(configs: "allouchi_deployment.yaml", kubeconfigId: "mykubeconfig")

                }
            }
        }
    }
}
