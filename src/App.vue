<template>
  <v-app>
    <v-app-bar app color="#006064" :elevation="2">
      <div class="text-center" style="width:100%;">
        <h1>Filmes</h1>
      </div>
    </v-app-bar>

  <v-container>   
    <v-row >
      <v-rol>
        <v-col cols="12" md="6">
          <v-text-field v-model="filmeNome" label="Filme" variant="outlined"></v-text-field>
        </v-col>
      </v-rol>  
      <v-rol>
        <v-col cols="12" md="4" class="text-right">
          <v-btn @click="adicionaFilme" class="bg-blue">Adicionar</v-btn>
        </v-col>
      </v-rol>
    </v-row>
    


    <v-row >
      <v-rol>
        <v-col offset-lg="2" lg="8" md="10">
          <v-table>
            <thead>
              <tr>
                <th class="text-left">Filmes</th>
              </tr>
            </thead>
          </v-table>      
        </v-col>
      </v-rol>
    </v-row>


   <v-table class="bg-green">     
      <v-field>
        <v-row >
          <v-col cols="12" md="6">
            <v-textarea v-model="entradafilme" label="NomeFilme" variant="outlined"></v-textarea>
            <td class="text-left" style="width: 80%">
              NomeFilme
            </td>
          
          </v-col>
        </v-row>
        <v-col>
          <td class="text-left">
          <v-select 
            v-model="estilofilme"  
                :items="['Acao', 'Animacao', 'Ficcao']"
                label="Estilo"
                multiple
                variant="outlined">
          </v-select>
        </td>
        </v-col>
      </v-field>

      <v-field>
        <v-row>
          <v-rol>
            <v-col>
              <v-select 
                label="Select"
                  :value="selecao" 
                  :items="['aguardando', 'assistindo', 'finalizado']" 
                  variant="outlined">
              </v-select>
            </v-col>
            <v-col>
              <v-btn @click="excluir" class="bg-red">Excluir</v-btn>
            </v-col>
          
          </v-rol>
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
import { createApp } from 'vue';

createApp(App) 
export default {
  name: 'App',

  components: {
    //HelloWorld,
    FormularioFilme
  },

  data: () => ({
    filmeNome: '',
    entradafilme: '',
    estilofilme: ['Acao', 'Animacao', 'Ficcao'], 

  }),

  methods: {
     adicionaFilme(){
      this.entradafilme += this.filmeNome + '';
      this.filmeNome ='';
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
