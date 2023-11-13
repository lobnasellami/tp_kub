pipeline {

  agent any

  environment {
        dockerCredentials = credentials('dockerCredentials')
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
                                    credentialsId: 'dockerCredentials' //jenkins-github-creds

                        sh "docker login -u lobnasellami"
                        sh "docker tag devopstp lobnasellami/devopstp:v1"
                        sh "docker push lobnasellami/devopstp:v1"
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
