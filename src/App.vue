<template>
  <v-app id="inspire">
    <v-app-bar color="#607D8B">
      <v-app-bar-nav-icon
        app
        color="#006064"
        :elevation="10"
      ></v-app-bar-nav-icon>
      <div class="text-center">
        <h1>FILMES</h1>
      </div>

      <v-spacer></v-spacer>

      <v-app-bar-title></v-app-bar-title>
    </v-app-bar>

    <v-container class="bg-blue-grey-lighten-4 pa-12">
      <v-row>
        <v-col>
          <!--inicio do campo para consulta-->
          <div>
            <v-btn
              v-if="!mostrarCampoConsulta"
              @click="botaoConsultarFilme"
              class="bg-blue-grey-lighten-4"
              ><svg-icon type="mdi" :path="buscaIconFilme"></svg-icon
            ></v-btn>
          </div>
          <div v-if="mostrarCampoConsulta">
            <input
              v-model="buscarFilme"
              placeholder="Digite o nome do filme"
              class="bg-blue-grey-lighten-4"
            />
            <v-btn @click="consultarFilme" class="bg-blue-grey-lighten-4"
              ><svg-icon type="mdi" :path="buscaIconFilme"></svg-icon
            ></v-btn>
          </div>

          <!-- Resultados da consulta -->
          <div v-if="resultadoConsulta.length > 0">
            <h2>Resultados da Consulta:</h2>
            <ul>
              <li v-for="(filme, index) in resultadoConsulta" :key="index">
                <a :href="'#filme-' + index" @click="scrollParaItem(index)">
                  {{ filme.nome }} - {{ filme.estilo }} - {{ filme.status }}
                </a>
              </li>
            </ul>
          </div>
          <div v-else-if="buscarFilme !== '' && resultadoConsulta.length === 0">
            <p>Nenhum resultado encontrado para "{{ buscarFilme }}"</p>
          </div>
          <!--fim do campo para consulta-->
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="2">
          <v-text-field
            v-model="filme.nome"
            label="Filme"
            variant="solo-filled"
            @keypress.enter="adicionaFilme"
          ></v-text-field>
        </v-col>

        <v-col cols="12 " md="2">
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

        <v-col cols="12 " md="2">
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
          <v-btn v-if="!filme.editando" @click="adicionaFilme" class="bg-blue"
            >Adicionar<svg-icon type="mdi" :path="addIcon"></svg-icon
          ></v-btn>
          <v-btn v-else @click="salvarEdicao()" class="bg-blue"
            ><svg-icon type="mdi" :path="saveEditIcon"></svg-icon
          ></v-btn>
          <v-btn @click="cancelar" class="bg-orange"
            >Cancelar<svg-icon type="mdi" :path="addIcon"></svg-icon
          ></v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col offset-lg="2" lg="8" md="6">
          <v-table>
            <thead>
              <th class="text-center">LISTA DE FILMES</th>
            </thead>
          </v-table>
        </v-col>
      </v-row>

      <v-table class="bg-blue-grey-lighten-2">
        <thead>
          <tr>
            <th class="text-left">NOME</th>
            <th class="text-left">ESTILO</th>
            <th class="text-left">STATUS</th>
          </tr>
        </thead>

        <tbody
          v-for="(filme, index) in listaFilmes"
          :key="index"
          :id="'filme-' + index"
        >
          <tr>
            <td>{{ filme.nome }}</td>
            <td>{{ filme.estilo }}</td>
            <td>{{ filme.status }}</td>

            <td>
              <v-col cols="12" md="6">
                <v-btn @click="editarFilme(filme.id)" class="bg-green"
                  ><svg-icon type="mdi" :path="editarIcon"></svg-icon
                ></v-btn>
              </v-col>
            </td>
            <td>
              <v-col cols="12" md="6">
                <v-btn @click="excluirFilme(filme.id)" class="bg-red"
                  ><svg-icon type="mdi" :path="excluirIcon"></svg-icon
                ></v-btn>
              </v-col>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-container>

    <v-main>
      <FormularioFilme />
    </v-main>
  </v-app>
</template>

<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiAccount } from "@mdi/js";
import { mdiDeleteForever } from "@mdi/js";
import { mdiTextBoxEdit } from "@mdi/js";
import { mdiContentSaveEditOutline } from "@mdi/js";
import { mdiCheckCircleOutline } from "@mdi/js";
import { mdiMagnify } from "@mdi/js";
</script>

<script>
import FormularioFilme from "./components/FormularioFilme.vue";
import App from "./App.vue";
import { createApp, toRaw } from "vue";
import db from "@/database/db";
//import { liveQuery } from "dexie";
//import { useObservable } from "@vueuse/rxjs";

createApp(App);

export default {
  name: "App",

  components: {
    FormularioFilme,
    SvgIcon,
  },

  data: () => ({
    filme: {
      nome: "",
      status: [],
      estilo: [],
    },

    path: mdiAccount,
    excluirIcon: mdiDeleteForever,
    editarIcon: mdiTextBoxEdit,
    saveEditIcon: mdiContentSaveEditOutline,
    addIcon: mdiCheckCircleOutline,
    buscaIconFilme: mdiMagnify,
    listaFilmes: [],
    buscarFilme: "",
    resultadoConsulta: [],
    mostrarCampoConsulta: false,
  }),

  mounted() {
    console.log("db");
    console.log(db);
    console.log(db.filmes);
    this.getFilmes();
  },

  methods: {
    getFilmes() {
      db.filmes.toArray().then((f) => {
        console.log(f);
        this.listaFilmes = f;
        //this.listaFilmes.push(this.filme);
      });
    },

    cancelar() {
      this.filme = {
        nome: "",
        status: [],
        estilo: [],
      };
    },

    adicionaFilme() {
      console.log(this.listaFilmes);
      console.log(toRaw(this.filme));
      this.filme = toRaw(this.filme);
      db.filmes
        .add(toRaw(this.filme))
        .then(() => {
          console.log("Filme salvo no banco de dados Dexie");
          this.getFilmes();
        })
        .catch((error) => {
          console.error("Erro ao salvar filme:", error);
        }),
        (this.filme = {
          nome: "",
          status: [],
          estilo: [],
        });
    },

    // adicao da funcao editarFilme
    async editarFilme(id) {
      this.filme = await db.filmes.get(id);
      this.filme.editando = true;
      /*this.listaFilmes.forEach((filme) => {
        if (id) {
          filme.editando = true;
          this.filmeEditando = {
            nome: filme.nome,
            status: filme.status,
            estilo: filme.estilo,
          };
        } else {
          filme.editando = false;
        }
      })*/
    },
    async salvarEdicao() {
      /*this.listaFilmes[id].nome = this.filmeEditando.nome;
      this.listaFilmes[id].status = this.filmeEditando.status;
      this.listaFilmes[id].estilo = this.filmeEditando.estilo;
      this.listaFilmes[id].editando = false;*/

      db.filmes.update(this.filme.id, toRaw(this.filme)).then(() => {
        this.getFilmes();
      });
    },
    // fim da funcao editarFilme

    //funcao para exclusao
    excluirFilme(id) {
      console.log(id);
      db.filmes.delete(id).then(() => {
        this.getFilmes();
      });
    },
    //fim da funcao exclusao

    //funcao consultar filme
    botaoConsultarFilme() {
      this.mostrarCampoConsulta = !this.mostrarCampoConsulta;
      if (this.mostrarCampoConsulta) {
        this.consultarFilme();
      }
      console.log("botao consulta");
    },

    consultarFilme() {
      if (this.buscarFilme.trim() !== "") {
        this.resultadoConsulta = this.listaFilmes.filter((filme) => {
          return filme.nome
            .toLowerCase()
            .includes(this.buscarFilme.toLowerCase());
        });
      } else {
        this.resultadoConsulta = [];
      }
    },

    scrollParaItem(index) {
      const elemento = document.getElementById(`filme-${index}`);
      if (elemento) {
        elemento.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: relative-size;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
