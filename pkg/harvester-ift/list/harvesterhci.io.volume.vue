<script>
import Loading from '@shell/components/Loading';
import ResourceTable from '@shell/components/ResourceTable';
import HarvesterVolumeState from '../formatters/HarvesterVolumeState';
import { HCI as HCI_ANNOTATIONS } from '@pkg/harvester-ift/config/labels-annotations';

import { allHash } from '@shell/utils/promise';
import { PV, PVC, SCHEMA, LONGHORN } from '@shell/config/types';
import { HCI, VOLUME_SNAPSHOT, PRODUCT_NAME } from '../types';
import { STATE, AGE, NAME, NAMESPACE } from '@shell/config/table-headers';

const schema = {
  id:         HCI.VOLUME,
  type:       SCHEMA,
  attributes: {
    kind:       HCI.VOLUME,
    namespaced: true
  },
  metadata: { name: HCI.VOLUME },
};

export default {
  name:       'HarvesterListVolume',
  components: {
    Loading, ResourceTable, HarvesterVolumeState
  },

  async fetch() {
    // const inStore = this.$store.getters['currentProduct'].inStore;
    const _hash = {
      pvcs:            this.$store.dispatch(`${ PRODUCT_NAME }/findAll`, { type: PVC }),
      pvs:             this.$store.dispatch(`${ PRODUCT_NAME }/findAll`, { type: PV }),
      vms:             this.$store.dispatch(`${ PRODUCT_NAME }/findAll`, { type: HCI.VM }),
      longhornVolumes: this.$store.dispatch(`${ PRODUCT_NAME }/findAll`, { type: LONGHORN.VOLUMES }),
    };

    const volumeSnapshotSchema = this.$store.getters[`${ PRODUCT_NAME }/schemaFor`](VOLUME_SNAPSHOT);

    if (volumeSnapshotSchema) {
      _hash.snapshots = this.$store.dispatch(`${ PRODUCT_NAME }/findAll`, { type: VOLUME_SNAPSHOT });
    }

    const hash = await allHash(_hash);

    const pvcSchema = this.$store.getters[`${ PRODUCT_NAME }/schemaFor`](PVC);

    if (!pvcSchema?.collectionMethods.find(x => x.toLowerCase() === 'post')) {
      this.$store.dispatch('type-map/configureType', { match: HCI.VOLUME, isCreatable: false });
    }

    this.rows = hash.pvcs.filter((resource) => {
      let pvctype = '';

      if (resource?.metadata?.annotations?.[HCI_ANNOTATIONS.VOLUME_VM]) {
        pvctype = JSON.parse(resource?.metadata?.annotations?.[HCI_ANNOTATIONS.VOLUME_VM]).type;
      }

      return pvctype === 'disk' || pvctype === 'image';
    });
  },

  data() {
    return { rows: [] };
  },

  computed: {
    schema() {
      return schema;
    },

    headers() {
      return [
        STATE,
        NAME,
        NAMESPACE,
        {
          name:          'size',
          labelKey:      'tableHeaders.size',
          value:         'spec.resources.requests.storage',
          sort:          'volumeSort',
          formatter:     'Si',
          formatterOpts: {
            opts: {
              increment: 1024, addSuffix: true, maxExponent: 3, minExponent: 3, suffix: 'i',
            },
            needParseSi: true
          },
        },
        {
          name:     'AttachedVM',
          labelKey: 'tableHeaders.attachedVM',
          type:     'attached',
          value:    'spec.claimRef',
          sort:     'name',
        },
        // {
        //   name:      'VolumeSnapshotCounts',
        //   labelKey:  'harvester.tableHeaders.volumeSnapshotCounts',
        //   value:     'relatedVolumeSnapshotCounts',
        //   formatter: 'RelatedVolumeSnapshotCounts',
        //   sort:      'name',
        // },
        {
          ...STATE,
          name:          'phase',
          labelKey:      'tableHeaders.phase',
          formatterOpts: { arbitrary: true },
          value:         'phaseState',
        },
        AGE,
      ];
    },
  },

  methods: {
    goTo(row) {
      return row?.attachVM?.detailLocation;
    },

    getVMName(row) {
      return row.attachVM?.metadata?.name || '';
    }
  },

  typeDisplay() {
    return this.$store.getters['type-map/labelFor'](schema, 99);
  },
};
</script>

<template>
  <Loading v-if="$fetchState.pending" />
  <ResourceTable
    v-else
    v-bind="$attrs"
    :headers="headers"
    :groupable="true"
    default-sort-by="age"
    :namespaced="true"
    :rows="rows"
    :schema="schema"
    key-field="_key"
    v-on="$listeners"
  >
    <template
      slot="cell:state"
      slot-scope="scope"
      class="state-col"
    >
      <div class="state">
        <HarvesterVolumeState
          class="vmstate"
          :row="scope.row"
        />
      </div>
    </template>
    <template
      slot="cell:AttachedVM"
      slot-scope="scope"
    >
      <div>
        <n-link
          v-if="getVMName(scope.row)"
          :to="goTo(scope.row)"
        >
          {{ getVMName(scope.row) }}
        </n-link>
      </div>
    </template>
  </ResourceTable>
</template>

<style lang="scss" scoped>
.state {
  display: flex;

  .vmstate {
    margin-right: 6px;
  }
}
</style>
