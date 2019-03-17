
export Agent_Repo="mayadataio/workload-backend-agent"
export Aggregator_Repo="mayadataio/workload-backend-aggregator"
export TAG=${TRAVIS_COMMIT::7}

echo ${Agent_Repo}
echo ${Aggregator_Repo}
echo ${TAG}

docker image build -t ${Agent_Repo}:${TAG} ./agent/ --no-cache
docker image build -t ${Aggregator_Repo}:${TAG}  ./aggregator/ --no-cache
