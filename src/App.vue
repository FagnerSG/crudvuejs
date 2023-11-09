<template>
  <v-app>
    <v-app-bar app color="#006064" :elevation="2">
      <div class="text-center" style="width:100%;">
        <h1>Filmes</h1>
      </div>
    </v-app-bar>

  <v-container>  
    <v-row class="text-center">
      <v-spacer>
      <v-col offset-lg="3" lg="6" md="12">
        <v-rol>
          <v-col cols="10">
            <v-text-field label="Filme" variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="12" class="text-right">
            <v-btn class="bg-primary">Adicionar</v-btn>
          </v-col>
        </v-rol>
        <v-row>

        </v-row>
      </v-col>
    </v-spacer>
    </v-row>

    <row class="text-center">
      <v-col offset-lg="2" lg="8" md="12">
        <v-table>
          <thead>
            <tr>
              <th class="text-left" style="width: 60%">Filme</th>
              <th class="text-right"> </th>
            </tr>
          </thead>
        </v-table>
      </v-col>
    </row>

    <tbody>
      <tr>
        <td class="text-left" style="width: 85%">NomeFilme</td>
        <td class="text-right">
          <v-select label="Select" :items="['aguardando', 'assistindo', 'finalizado']" variant="outlined">
          </v-select>
        </td>
      </tr>
    </tbody>

    <v-select label="Estilo" :items="['Acao', 'Animacao', 'Ficcao']" variant="outlined">
    </v-select>

    
  </v-container>
    
    <v-main>
      <FormularioFilme/>

    </v-main>
  </v-app>
</template>

<script>
import FormularioFilme from './components/FormularioFilme.vue'
export default {
  name: 'App',

  components: {
    //HelloWorld,
    FormularioFilme
  },

  data: () => ({
    //
  }),
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
