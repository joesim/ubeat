<template>
  <div class="page-background-image">

    <div class="container content">
        <div class="card-body">
          <h1 class="light-blue-text text-center">My music, my rhythm!</h1>
          <br/>
          <p class="text-justify">Bienvenue sur le site <b>le plus musical</b> du web! Vous aimez la musique et aimeriez disposer d'un outil vous permettant de <b>créer</b> et <b>partager</b> à vos amis <b>vos différentes compilations musicales</b>, ce site est ce que vous recherchez. Pour avoir une idée des artistes et albums disponibles sur le site, vous pouvez regarder dans la section ci-dessous ou encore utiliser l'outil de recherche présent dans la barre de menu. N'hésitez pas à vous inscrire dès maintenant et bonne écoute!</p>
        </div>
      <div class="card card-spacing">
        <div class="card-body">

          <ul class="nav nav-tabs nav-justified">
            <li class="nav-item nav-item-tab-color">
              <a class="nav-link active" data-toggle="tab" href="#panel1" role="tab">Artists</a>
            </li>
            <li class="nav-item nav-item-tab-color">
              <a class="nav-link" data-toggle="tab" href="#panel2" role="tab">Albums</a>
            </li>
          </ul>

          <div class="tab-content card-spacing">
            <div class="tab-pane fade in show active tab-pane-border-bottom card-body" id="panel1" role="tabpanel">
              <table class="table table-striped table-border-bottom table-column-proportion text-center" id="table-list-all-albums">
                <tbody>
                <tr>
                  <th scope="row" class="align-middle"><img src="http://www.lovemarks.com/wp-content/uploads/lovemark-michael-jackson-standard-600x600.jpg" class="img-fluid table-icon" alt="artist picture"></th>
                  <td class="align-middle">Michael Jackson</td>
                  <td class="align-middle"><a class="btn btn-light-blue waves-effect waves-light" href="./#/artist"><i class="fa fa-caret-right mr-1"></i>Go to artist page</a></td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="tab-pane fade tab-pane-border-bottom card-body" id="panel2" role="tabpanel">
              <table class="table table-striped table-border-bottom text-center" id="table-list-all-artists">
                <tbody>
                <tr>
                  <th scope="row" class="align-middle"><img src="https://upload.wikimedia.org/wikipedia/en/9/99/Sam_Smith_-_In_the_Lonely_Hour_%28Official_Album_Cover%29.png" class="img-fluid table-icon" alt="album picture"></th>
                  <td class="align-middle">In the lonely hour</td>
                  <td class="align-middle"><a class="btn btn-light-blue waves-effect waves-light" href="./#/album"><i class="fa fa-caret-right mr-1"></i>Go to album page</a></td>
                </tr>
                <tr>
                  <th scope="row" class="align-middle"><img src="https://upload.wikimedia.org/wikipedia/en/9/91/Xscape.png" class="img-fluid table-icon" alt="album picture"></th>
                  <td class="align-middle">Xscape</td>
                  <td class="align-middle"><a class="btn btn-light-blue waves-effect waves-light disabled" href="./#/album"><i class="fa fa-caret-right mr-1"></i>Go to album page</a></td>
                </tr>
                <tr>
                  <th scope="row" class="align-middle"><img src="https://upload.wikimedia.org/wikipedia/en/8/8f/Michaelalbumcover.jpg" class="img-fluid table-icon" alt="album picture"></th>
                  <td class="align-middle">Michael</td>
                  <td class="align-middle"><a class="btn btn-light-blue waves-effect waves-light disabled" href="./#/album"><i class="fa fa-caret-right mr-1"></i>Go to album page</a></td>
                </tr>
                <tr>
                  <th scope="row" class="align-middle"><img src="https://upload.wikimedia.org/wikipedia/en/9/98/Mjinvincible.jpg" class="img-fluid table-icon" alt="album picture"></th>
                  <td class="align-middle">Invincible</td>
                  <td class="align-middle"><a class="btn btn-light-blue waves-effect waves-light disabled" href="./#/album"><i class="fa fa-caret-right mr-1"></i>Go to album page</a></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="d-flex justify-content-center">

            <nav class="my-4 pt-2">
              <ul class="pagination pagination-circle pg-blue mb-0">

                <li class="page-item clearfix d-none d-md-block disabled"><a class="page-link">First</a></li>

                <li class="page-item disabled">
                  <a class="page-link" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                  </a>
                </li>

                <li class="page-item active"><a class="page-link">1</a></li>

                <li class="page-item disabled">
                  <a class="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                  </a>
                </li>

                <li class="page-item clearfix d-none d-md-block disabled"><a class="page-link">Last</a></li>

              </ul>
            </nav>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style>

</style>
