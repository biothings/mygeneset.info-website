import AppAgo from '@/components/AppAgo.vue';

<template>
  <AppSection>
    <AppHeading level="2" link="faq">FAQ's</AppHeading>

    <AppFlex direction="col" h-align="left">
      <AppHeading level="3">Where can I find the source code?</AppHeading>
      <p>
        The source code for all BioThings tools are hosted on the
        <AppLink to="https://github.com/biothings"
          >BioThings GitHub organization</AppLink
        >. The source code for the MyGeneset API can be found in
        <AppLink to="https://github.com/biothings/mygeneset.info"
          >this repository</AppLink
        >. The source code for the MyGeneset web app can be found in
        <AppLink to="https://github.com/biothings/mygeneset.info-website"
          >this repository</AppLink
        >.
      </p>

      <AppHeading level="3">Where can I suggest a new feature?</AppHeading>
      <p>
        If you'd like this website to have new functionality or behave
        differently,
        <AppLink to="https://github.com/biothings/mygeneset.info-website/issues"
          >file an issue here</AppLink
        >. If you'd like more built-in genesets, additional query functionality,
        or anything else related to the API,
        <AppLink to="https://github.com/biothings/mygeneset.info/issues"
          >file an issue here</AppLink
        >.
      </p>

      <AppHeading level="3"
        >Where do the genes and genesets come from?</AppHeading
      >
      <p>
        The genes themselves come from the BioThings
        <AppLink to="https://mygene.info/">MyGene</AppLink> project, which
        contains millions of genes from thousands of species. All of the genes
        from MyGene.info can be searched for and selected in the
        <AppLink to="/build">geneset builder</AppLink>
        .
      </p>
      <p>
        Detailed information on the sources of gene annotations in MyGene.info
        can be found
        <AppLink
          to="https://docs.mygene.info/en/latest/doc/data.html#data-sources"
          >here (major sources)</AppLink
        >
        and
        <AppLink
          to="https://docs.mygene.info/en/latest/doc/data.html#available-fields"
          >here (additional sources and annotation fields)</AppLink
        >. Detailed information on the species coverage of MyGene.info can be
        found
        <AppLink to="https://docs.mygene.info/en/latest/doc/data.html#species"
          >here</AppLink
        >.
      </p>
      <p>
        The built-in/curated genesets are publicly-accessible and come from the
        following sources:
      </p>
      <div class="table-wrapper">
        <table>
          <tr>
            <th>Source</th>
            <th>Sets</th>
            <th
              v-tippy="
                'Date when genesets were downloaded from their upstream source'
              "
            >
              Downloaded
            </th>
            <th
              v-tippy="
                'Date when genesets were parsed, processed, etc. and uploaded to the database'
              "
            >
              Uploaded
            </th>
            <th>License</th>
          </tr>
          <tr
            v-for="(source, index) in $store.state.metadata?.curatedMeta"
            :key="index"
          >
            <td>
              <AppLink :to="source.url">{{ source.name }}</AppLink>
            </td>
            <td>{{ source.count.toLocaleString() }}</td>
            <td>
              <AppAgo v-if="source.downloaded" :date="source.downloaded" />
            </td>
            <td>
              <AppAgo v-if="source.uploaded" :date="source.uploaded" />
            </td>
            <td>
              <AppLink :to="source.licenseUrl">{{ source.license }}</AppLink>
            </td>
          </tr>
        </table>
      </div>

      <AppHeading level="3">How often is the data updated?</AppHeading>
      <p>
        User-created genesets are available right away. Built-in genesets
        (listed above) are
        <AppLink to="https://mygeneset.info/v1/metadata"
          >updated from their original sources weekly</AppLink
        >. The genes themselves (their annotation data) are also
        <AppLink to="https://mygene.info/metadata">updated weekly</AppLink>.
      </p>

      <AppHeading level="3">How are Gene IDs mapped?</AppHeading>
      <p>
        Gene IDs are mapped using MyGene.info. Detailed information on the data
        integration process used to build MyGene.info can be found in the
        <AppLink
          to="https://genomebiology.biomedcentral.com/articles/10.1186/s13059-016-0953-9"
        >
          publication from Genome Biology
        </AppLink>
      </p>

      <AppHeading level="3">What's behind MyGeneset?</AppHeading>
      <p>
        MyGeneset uses the powerful
        <AppLink to="https://www.elastic.co/">Elasticsearch</AppLink> for its
        backend database and query engine. Its web service API was built with
        the
        <AppLink to="https://pypi.org/project/biothings/">BioThings SDK</AppLink
        >. This allows querying for data to be simple, flexible, and
        performative.
      </p>
    </AppFlex>
  </AppSection>
</template>

<script setup lang="ts">
import AppAgo from "@/components/AppAgo.vue";
</script>

<style lang="scss" scoped>
.table-wrapper {
  max-width: 100%;
  overflow-x: auto;
}

table {
  text-align: left;
}

th,
td {
  padding: 5px 20px;
}
</style>
