
export Agent_Repo="mayadataio/workload-backend-agent"
export Aggregator_Repo="mayadataio/workload-backend-aggregator"
export TAG=${TRAVIS_COMMIT::7}

echo ${Agent_Repo}
echo ${Aggregator_Repo}
echo ${TAG}
echo ${TRAVIS_BRANCH} ${TRAVIS_PULL_REQUEST}

docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}

if [ ${TRAVIS_BRANCH} = "master" -a ${TRAVIS_PULL_REQUEST} = "false" ]
then
 docker push ${Aggregator_Repo}:${TAG} 
 docker push ${Agent_Repo}:${TAG}
else
  echo "build is successfull"
fi
