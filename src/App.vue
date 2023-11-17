<template>
  <v-app>
    <v-app-bar app color="#006064" :elevation="2">
      <div class="text-center" style="width: 100%">
        <h1>Filmes</h1>
      </div>
    </v-app-bar>

    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="filme.nome"
            label="Filme"
            variant="solo-filled"
          ></v-text-field>
        </v-col>
        <v-col cols="12 " md="6">
          <v-select
            v-model="filme.estilo"
            :value="selecao"
            :items="['Acao', 'Animacao', 'Ficcao']"
            label="Estilo"
            multiple
            chips
            variant="outlined"
          >
          </v-select>
        </v-col>
        <v-col cols="12 " md="6">
          <v-select
            v-model="filme.status"
            label="Status"
            :value="selecao"
            :items="['aguardando', 'assistindo', 'finalizado']"
            variant="outlined"
          >
          </v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-btn @click="adicionaFilme" class="bg-blue">Adicionar</v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-rol>
          <v-col offset-lg="2" lg="8" md="6">
            <v-table>
              <thead>
                <th class="text-center">Lista de Filmes</th>
              </thead>
            </v-table>
          </v-col>
        </v-rol>
      </v-row>

      <v-table class="bg-green">
        <thead>
          <tr>
            <th class="text-left">Nome</th>
            <th class="text-left">Estilo</th>
            <th class="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in listaFilmes" :key="item.nome">
            <td>{{ item.nome }}</td>
            <td>{{ item.estilo }}</td>
            <td>{{ item.status }}</td>
            <v-col cols="12" md="6">
              <v-btn @click="excluirFilme" class="bg-red">Excluir</v-btn>
            </v-col>
          </tr>
          
        </tbody>
      </v-table>
    </v-container>

    <v-main>
      <FormularioFilme/>

    </v-main>
  </v-app>
</template>

<script>
import FormularioFilme from './components/FormularioFilme.vue'
export default {
  name: "App",

  components: {
    //HelloWorld,
    FormularioFilme
  },

  data: () => ({
    //items: ['Acao', 'Animacao', 'Ficcao'],
    estilofilme: ['Acao', 'Animacao', 'Ficcao'],
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
