pipeline {

  agent any

  environment {
            DOCKER_HUB_CREDENTIALS = credentials('dockerCredentials')
      

       
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
                  withCredentials([usernamePassword(credentialsId: 'dockerCredentials', usernameVariable:
'USERNAME', passwordVariable: 'PASSWORD')]){
                        docker.withRegistry("${DOCKER_HUB_CREDENTIALS}") {
                        docker.image("lobnasellami/devopstp:latest").push()

                        
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
