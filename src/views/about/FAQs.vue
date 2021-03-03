<template>
  <Section>
    <h2 id="faqs">FAQ's</h2>
    <h4>Where can I find the source code?</h4>
    <p>
      The source code for all BioThings tools are hosted on the
      <a href="https://github.com/biothings">BioThings GitHub organization</a>.
      The source code for the My Geneset API can be found in
      <a href="https://github.com/biothings/mygeneset.info">this repository</a>.
      The source code for the My Geneset web app can be found in
      <a href="https://github.com/biothings/mygeneset.info-website"
        >this repository</a
      >.
    </p>
    <h4>Where can I suggest a new feature?</h4>
    <p>
      If you'd like this website to have new functionality or behave
      differently,
      <a href="https://github.com/biothings/mygeneset.info-website/issues"
        >file an issue here</a
      >. If you'd like more built-in genesets, additional query functionality,
      or anything else related to the API,
      <a href="https://github.com/biothings/mygeneset.info/issues"
        >file an issue here</a
      >.
    </p>
    <h4>Where do the genes and genesets come from?</h4>
    <p>
      The genes themselves come from the BioThings
      <a href="https://mygene.info/">My Gene</a> project, which contains
      millions of genes from thousands of species. The built-in genesets come
      from various public sources:
    </p>
    <ul>
      <li>
        <a
          href="https://www.gsea-msigdb.org/gsea/msigdb/genesets.jsp?collection=CP:KEGG"
          >KEGG</a
        >
      </li>
      <li>
        <a
          href="https://www.gsea-msigdb.org/gsea/msigdb/genesets.jsp?collection=CP:BIOCARTA"
          >BIOCARTA</a
        >
      </li>
      <li>
        <a
          href="https://www.gsea-msigdb.org/gsea/msigdb/genesets.jsp?collection=CP:REACTOME"
          >REACTOME</a
        >
      </li>
      <li>
        <a
          href="https://www.gsea-msigdb.org/gsea/msigdb/genesets.jsp?collection=CP:WIKIPATHWAYS"
          >WIKIPATHWAYS</a
        >
      </li>
    </ul>
    <h4>How often is the data updated?</h4>
    <p>
      User-created genesets are available right away. Built-in genesets (listed
      above) are
      <a href="http://mygeneset.info/v1/metadata"
        >updated from their original sources weekly</a
      >. <br /><br />
      The genes themselves (their annotation data) is also
      <a href="http://mygene.info/v1/metadata">updated weekly</a>.
    </p>
    <h4>What's behind My Geneset?</h4>
    <p>
      My Geneset uses the powerful
      <a href="https://www.elastic.co/">Elasticsearch</a> for its backend
      database and query engine. This allows querying for data to be simple,
      flexible, and performative.
    </p>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";

export default defineComponent({
  components: {
    Section
  }
});
</script>
