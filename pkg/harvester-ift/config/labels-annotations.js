export const HCI = {
  CLOUD_INIT:                   'harvesterhci.io/cloud-init-template',
  CURRENT_IP:                   'rke2.io/internal-ip',
  OWNED_BY:                     'harvesterhci.io/owned-by',
  IMAGE_ID:                     'harvesterhci.io/imageId',
  SSH_NAMES:                    'harvesterhci.io/sshNames',
  NETWORK_IPS:                  'network.harvesterhci.io/ips',
  TEMPLATE_VERSION_CUSTOM_NAME: 'template-version.harvesterhci.io/customName',
  CREATOR:                      'harvesterhci.io/creator',
  OS:                           'harvesterhci.io/os',
  NETWORK_TYPE:                 'network.harvesterhci.io/type',
  VM_NAME:                      'harvesterhci.io/vmName',
  VM_NAME_PREFIX:               'harvesterhci.io/vmNamePrefix',
  VM_RESERVED_MEMORY:           'harvesterhci.io/reservedMemory',
  MAINTENANCE_STATUS:           'harvesterhci.io/maintain-status',
  HOST_CUSTOM_NAME:             'harvesterhci.io/host-custom-name',
  HOST_CONSOLE_URL:             'harvesterhci.io/host-console-url',
  RESTORE_NAME:                 'restore.harvesterhci.io/name',
  NODE_ROLE_MASTER:             'node-role.kubernetes.io/master',
  NODE_ROLE_CONTROL_PLANE:      'node-role.kubernetes.io/control-plane',
  PROMOTE_STATUS:               'harvesterhci.io/promote-status',
  MIGRATION_STATE:              'harvesterhci.io/migrationState',
  VOLUME_CLAIM_TEMPLATE:        'harvesterhci.io/volumeClaimTemplates',
  VOLUME_CLAIM_CLONE_MODE:      'pvc.infortrend.com/pvc-clone-mode',
  VOLUME_CLONE_INFO:            'pvc.infortrend.com/pvc-clone-info',
  VOLUME_VM:                    'pvc.infortrend.com/vm-pvc',
  SC_SETTING:                   'sc.infortrend.com/scSetting',
  IMAGE_NAME:                   'harvesterhci.io/image-name',
  PVC_INUSE:                    'vmi.infortrend.com/pvcInUse',
  INIT_IP:                      'etcd.rke2.cattle.io/node-address',
  NODE_SCHEDULABLE:             'kubevirt.io/schedulable',
  // NETWORK_ROUTE:                'network.harvesterhci.io/route',
  NETWORK_ROUTE:                'k8s.v1.cni.cncf.io/resourceName',
  NAD_OCCUPATION:               'nad.infortrend.com/occupation',
  OS_UPGRADE_IMAGE:             'harvesterhci.io/os-upgrade-image',
  LATEST_UPGRADE:               'harvesterhci.io/latestUpgrade',
  UPGRADE_STATE:                'harvesterhci.io/upgradeState',
  REAY_MESSAGE:                 'harvesterhci.io/read-message',
  DYNAMIC_SSHKEYS_NAMES:        'harvesterhci.io/dynamic-ssh-key-names',
  DYNAMIC_SSHKEYS_USERS:        'harvesterhci.io/dynamic-ssh-key-users',
  IMAGE_SUFFIX:                 'harvesterhci.io/image-type',
  OS_TYPE:                      'harvesterhci.io/os-type',
  HOST_REQUEST:                 'management.cattle.io/pod-requests',
  STORAGE_CLASS:                'harvesterhci.io/storageClassName',
  STORAGE_NETWORK:              'storage-network.settings.harvesterhci.io',
  ADDON_EXPERIMENTAL:           'addon.harvesterhci.io/experimental',
  VOLUME_ERROR:                 'longhorn.io/volume-scheduling-error',
  KVM_DISABLE:                  'cpu-feature.node.kubevirt.io/svm',
  PVC_CLONE_STATUS:             'pvc.infortrend.com/pvcCloneStatus',
  KOPF_LAST_HANDLED:            'kopf.zalando.org/last-handled-configuration'
};
