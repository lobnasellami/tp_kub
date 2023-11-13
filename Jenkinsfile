pipeline {

  agent any

  environment {
            DOCKER_HUB_CREDENTIALS = credentials('dockerCredentials')
            DOCKER_IMAGE_NAME = 'lobnasellami/devopstp'
            DOCKER_IMAGE_TAG = 'latest'


       
    }

  stages {

    stage("getting code") {
            steps {
                git url: 'https://github.com/lobnasellami/tp_kub.git', branch: 'master',
                credentialsId: 'github-credentials' //jenkins-github-creds
            }
        }

    //build de l'image
         stage("image creation"){
            steps {                
                script {
                        sh "docker build -t devopstp ."
                       }            
                }
          } 

     stage("push to docker hub") {
            steps {                
                script {
                    echo "======== executing ========"
                        echo "push to hub"
                        docker.withRegistry("${DOCKER_HUB_CREDENTIALS}") {
                        docker.image("${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}").push()
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
