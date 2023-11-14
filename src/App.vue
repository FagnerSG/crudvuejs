<template>
  <v-app>
    <v-app-bar app color="#006064" :elevation="2">
      <div class="text-center" style="width:100%;">
        <h1>Filmes</h1>
      </div>
    </v-app-bar>

  <v-container>   
    <v-row >
      <v-field>
        <v-col cols="12" md="6">
          <v-text-field v-model="filmeNome" label="Filme" variant="solo-filled"></v-text-field>
        </v-col>
      </v-field>  
      <v-rol>
        <v-col cols="12" md="6">
          <v-btn @click="adicionaFilme" class="bg-blue">Adicionar</v-btn>
        </v-col>
      </v-rol>
    </v-row>
    
    <v-row >
      <v-rol>
        <v-col offset-lg="2" lg="8" md="6">
          <v-table>
            <thead>           
                <th class="text-center">Lista de Filmes </th>           
            </thead>
          </v-table>      
        </v-col>
      </v-rol>
    </v-row>

   
   <v-table class="bg-green">
    <div>     
      <v-field >
        <v-row align="start" no-gutters>
          <v-col cols="12" md="6">          
            <v-text-field
              v-for="(filmeNome, index) in listaFilmes" 
              :key="index" 
              v-model="entradaFilme" 
              label="NomeFilme" 
              variant="outlined"
              >
            </v-text-field>         
          </v-col>
        </v-row>
        <v-col>   
          <v-select  
            v-model="estiloFilme"
            :value="selecao"
            :items="['Acao', 'Animacao', 'Ficcao']" 
            label="Estilo" 
            multiple 
            chips
            variant="outlined">
          </v-select>      
        </v-col>
      </v-field>
    </div>

      <v-field>
        <v-row>         
            <v-col>
              <v-select 
                v-model="filmes.status"
                label="Status"
                :value="selecao" 
                :items="['aguardando', 'assistindo', 'finalizado']" 
                variant="outlined">
              </v-select>
            </v-col>
            <v-col>
              <td>
                <v-btn @click="excluirFilme" class="bg-red">Excluir</v-btn>
              </td>  
            </v-col>
        </v-row>
      </v-field>
    </v-table>
  </v-container>

    <v-main>
      <FormularioFilme/>
    </v-main>
  </v-app>
</template>

<script>
import FormularioFilme from './components/FormularioFilme.vue'
import App from './App.vue'
import { createApp } from 'vue'

createApp(App) 
export default {
  name: 'App',

  components: {
    FormularioFilme
  },

  data: () => ({
    filmes: {
      filmeNome: '',
      entradaFilme: '',
      estiloFilme: [],
      listaFilmes: [''],
      excluirFilme: '',
    },
    
    listaFilmes:[],
    estiloFilme: '',
    entradaFilme: '',
    value: ['acao', 'animacao', 'ficcao'],
  }),

  methods: {
    adicionaFilme(){
      this.entradaFilme = this.filmeNome + '';
      this.listaFilmes.push(this.filmeNome);   
    },

    adicionarEstilo(){
      this.estilofilme = [];
      this.estilofilme += this.filmes;
    },

    excluirFilme(filmes) {
      const index = this.filmes.indexOf(filmes)
      if (index !== -1){
        this.filmes.splice(index, 1);
      }
    },
  }

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
