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
                <th class="text-center">Filmes</th>
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
            <v-textarea
              v-for="(filmeNome, indice) in listaFilmes" :key="indice" v-model="entradaFilme" label="NomeFilme" variant="outlined" rows="1">
            </v-textarea>
          </v-col>
        </v-row>
        <v-col>   
          <v-select 
            v-for="(indice) in listaFilmes" 
            :key="indice" 
            v-model="estiloFilme" 
            :items="['Acao', 'Animacao', 'Ficcao']" l
            abel="Estilo" 
            multiple 
            variant="outlined">
          </v-select>      
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
              <td>
              <v-btn @click="excluir" class="bg-red">Excluir</v-btn>
            </td>  
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
import { createApp } from 'vue'

createApp(App) 
export default {
  name: 'App',

  components: {
    //HelloWorld,
    FormularioFilme
  },

  data: () => ({ 
    filmes: {
      filmeNome: '',
      entradaFilme: '',
      estiloFilme:[''],
    },
    estiloFilme: ['Acao', 'Animacao', 'Ficcao'], 
    listaFilmes: [],
  }),

  methods: {
     adicionaFilme(){
      this.entradaFilme += this.filmeNome + '';
      this.listaFilmes.push(this.filmeNome);
      this.filmeNome = '';
    },
    adicionarEstilo(){
      this.estilofilme =[];
      this.estilofilme += this.entradafilme;
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
