module.exports = function (appname, appnamespace, targetnamespace, volumename) {
    return (
        {
            "apiVersion": "batch/v1",
            "kind": "Job",
            "metadata": {
                "generateName": appnamespace + "-openebs-target-failure-",
                "namespace": "litmus"
            },
            "spec": {
                "template": {
                    "metadata": {
                        "labels": {
                            "name": "openebs-target-failure"
                        }
                    },
                    "spec": {
                        "containers": [
                            {
                                "args": [
                                    "-c",
                                    "ansible-playbook ./percona/chaos/openebs_target_failure/test.yml -i /etc/ansible/hosts -vv; exit 0"
                                ],
                                "command": [
                                    "/bin/bash"
                                ],
                                "env": [
                                    {
                                        "name": "ANSIBLE_STDOUT_CALLBACK",
                                        "value": "default"
                                    },
                                    {
                                        "name": "APP_NAMESPACE",
                                        "value": appnamespace
                                    },
                                    {
                                        "name": "TARGET_NAMESPACE",
                                        "value": targetnamespace
                                    },
                                    {
                                        "name": "APP_LABEL",
                                        "value": "app=" + appname
                                    },
                                    {
                                        "name": "APP_PVC",
                                        "value": volumename
                                    },
                                    {
                                        "name": "LIVENESS_APP_LABEL",
                                        "value": ""
                                    },
                                    {
                                        "name": "LIVENESS_APP_NAMESPACE",
                                        "value": ""
                                    }
                                ],
                                "image": "openebs/ansible-runner:ci",
                                "imagePullPolicy": "Always",
                                "name": "ansibletest",
                                "tty": true,
                                "volumeMounts": [
                                    {
                                        "mountPath": "/var/log/ansible",
                                        "name": "logs"
                                    }
                                ]
                            },
                            {
                                "args": [
                                    "-c",
                                    "./logger.sh -d ansibletest -r maya,openebs,pvc,percona; exit 0"
                                ],
                                "command": [
                                    "/bin/bash"
                                ],
                                "env": [
                                    {
                                        "name": "MY_POD_NAME",
                                        "valueFrom": {
                                            "fieldRef": {
                                                "fieldPath": "metadata.name"
                                            }
                                        }
                                    },
                                    {
                                        "name": "MY_POD_NAMESPACE",
                                        "valueFrom": {
                                            "fieldRef": {
                                                "fieldPath": "metadata.namespace"
                                            }
                                        }
                                    },
                                    {
                                        "name": "MY_POD_HOSTPATH",
                                        "value": "/mnt/chaos/openebs-cstor-target-failure"
                                    }
                                ],
                                "image": "openebs/logger",
                                "name": "logger",
                                "tty": true,
                                "volumeMounts": [
                                    {
                                        "mountPath": "/root/admin.conf",
                                        "name": "kubeconfig",
                                        "subPath": "admin.conf"
                                    },
                                    {
                                        "mountPath": "/mnt",
                                        "name": "logs"
                                    }
                                ]
                            }
                        ],
                        "restartPolicy": "Never",
                        "serviceAccountName": "litmus",
                        "volumes": [
                            {
                                "configMap": {
                                    "name": "kubeconfig"
                                },
                                "name": "kubeconfig"
                            },
                            {
                                "hostPath": {
                                    "path": "/mnt/chaos/openebs_cstor_target_failure",
                                    "type": ""
                                },
                                "name": "logs"
                            }
                        ]
                    }
                }
            }
        }
    );
}

