pipeline {

  agent any

  environment {
        DOCKER_HUB_CREDENTIALS = credentials('dockerCredentials')
    }

  stages {

    stage("getting code") {
            steps {
                git url: 'https://github.com/eyasoussi/tp_Kubernetes.git', branch: 'main',
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
                  withCredentials([usernamePassword(credentialsId: 'dockerCredentials', usernameVariable:
'USERNAME', passwordVariable: 'PASSWORD')]){
                        sh "docker tag devopstp eyasoussi/devopstp:v1"
                        sh "docker push eyasoussi/devopstp:v1"
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
