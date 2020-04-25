import './style.scss';
import Vue from 'vue';
import genres from './util/genres';

new Vue({
  el: '#app',
  components: {
    'movie-list': {
      template: `
            <div id="movie-list">
                <div v-for="movie in movies" class="movie">
                    {{ movie.title }}
                </div>
            </div>`,
      data() {
        return {
          movies: [
            { title: 'Pulp fiction' },
            { title: 'Hoem Alone' },
            { title: 'Harry Potter' },
          ],
        };
      },
    },
    'movie-filter': {
      data() {
        return {
          genres,
        };
      },
      template: `
            <div id="movie-filter">
              <h2>Filter Results</h2>
              <div class="filter-group">
                <check-filter v-for="genre in genres"></check-filter>
              </div>
            </>`,
      components: {
        'check-filter': {
          template: `<div>Filter</div>`,
        },
      },
    },
  },
});
