<template>
  <div class="page-background-image">

    <div class="container content">
      <div class="card-body">
        <h1 class="light-blue-text text-center">My music, my rhythm!</h1>
        <br/>
        <p class="text-justify">Bienvenue sur le site
          <b>le plus musical</b> du web! Vous aimez la musique et aimeriez disposer d'un outil vous permettant de
          <b>créer</b> et
          <b>partager</b> à vos amis
          <b>vos différentes compilations musicales</b>, ce site est ce que vous recherchez. Pour avoir une idée des artistes et albums disponibles sur le site, vous pouvez regarder dans la section ci-dessous ou encore utiliser l'outil de recherche présent dans la barre de menu. N'hésitez pas à vous inscrire dès maintenant et bonne écoute!</p>
      </div>

      <ul class="nav nav-tabs nav-justified bg-light-blue">
        <li class="nav-item">
          <a class="nav-link active" data-toggle="tab" href="#panel1" role="tab">Profile</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" href="#panel2" role="tab">Follow</a>
        </li>
      </ul>

      <div class="tab-content card">
        <div class="tab-pane fade in show active" id="panel1" role="tabpanel">
          <table class="table text-center" id="table-list-all-albums">
            <tbody>
              <tr>
                <th scope="row" class="align-middle"><img src="http://www.lovemarks.com/wp-content/uploads/lovemark-michael-jackson-standard-600x600.jpg" class="img-fluid table-icon rounded z-depth-1" alt="artist picture"></th>
                <td class="align-middle">Michael Jackson</td>
                <td class="align-middle">
                  <a href="./#/artist">Go to artist page</a>
                </td>
              </tr>
              <tr>
                <th scope="row" class="align-middle"><img src="http://www.lovemarks.com/wp-content/uploads/lovemark-michael-jackson-standard-600x600.jpg" class="img-fluid table-icon rounded z-depth-1" alt="artist picture"></th>
                <td class="align-middle">Michael Jackson</td>
                <td class="align-middle">
                  <a href="./#/artist">Go to artist page</a>
                </td>
              </tr>
              <tr>
                <th scope="row" class="align-middle"><img src="http://www.lovemarks.com/wp-content/uploads/lovemark-michael-jackson-standard-600x600.jpg" class="img-fluid table-icon rounded z-depth-1" alt="artist picture"></th>
                <td class="align-middle">Michael Jackson</td>
                <td class="align-middle">
                  <a href="./#/artist">Go to artist page</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="tab-pane fade" id="panel2" role="tabpanel">
          <br>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil odit magnam minima, soluta doloribus reiciendis molestiae placeat unde eos molestias. Quisquam aperiam, pariatur. Tempora, placeat ratione porro voluptate odit minima.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil odit magnam minima, soluta doloribus reiciendis molestiae placeat unde eos molestias. Quisquam aperiam, pariatur. Tempora, placeat ratione porro voluptate odit minima.</p>
        </div>

        <div class="d-flex justify-content-center">
          <ul class="pagination pagination-square pg-blue mb-0">

            <li class="page-item clearfix d-none d-md-block">
              <a class="page-link">First</a>
            </li>

            <li class="page-item">
              <a class="page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
              </a>
            </li>

            <li class="page-item active">
              <a class="page-link">1</a>
            </li>

            <li class="page-item">
              <a class="page-link">2</a>
            </li>

            <li class="page-item">
              <a class="page-link">3</a>
            </li>

            <li class="page-item">
              <a class="page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
              </a>
            </li>

            <li class="page-item clearfix d-none d-md-block">
              <a class="page-link">Last</a>
            </li>

          </ul>
        </div>

      </div>
    </div>

  </div>
</template>

<style>

</style>
