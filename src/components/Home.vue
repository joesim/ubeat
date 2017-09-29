<template>
    <div class="container content">
      <div class="card-body">
        <h1 class="light-blue-text text-center">My music, my rhythm!</h1>
        <br/>
        <p class="text-justify">Welcome to the
          <b>most musical</b> website on the Internet! You love music and would like to have a tool that allows you to
          <b>create</b> and
          <b>share</b> to your friends
          <b>your custom music compilations</b>, then this site is what you are looking for. To get an idea of the various artists and albums available on the website, you can look in the section below or use the search tool located in the menu bar. Do not hesitate to register now and good music listening!</p>
      </div>

      <ul class="nav nav-tabs nav-justified bg-light-blue">
        <li class="nav-item">
          <a class="nav-link active" data-toggle="tab" href="#panel1" role="tab">Artists</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" href="#panel2" role="tab">Albums</a>
        </li>
      </ul>

      <div class="tab-content card">
        <div class="tab-pane fade in show active" id="panel1" role="tabpanel">
          <table class="table text-center" id="table-list-all-artists">
            <tbody>
              <tr>
                <th scope="row" class="align-middle"><img src="http://www.lovemarks.com/wp-content/uploads/lovemark-michael-jackson-standard-600x600.jpg" class="img-fluid table-icon rounded z-depth-1" alt="artist picture"></th>
                <td class="align-middle">Michael Jackson</td>
                <td class="align-middle">
                  <a class="btn btn-light-blue waves-effect waves-light btn-sm" href="./#/artist"><i class="fa fa-search mr-1"></i>See more</a>
                </td>
              </tr>
              <tr>
                <th scope="row" class="align-middle"><img src="http://www.lovemarks.com/wp-content/uploads/lovemark-michael-jackson-standard-600x600.jpg" class="img-fluid table-icon rounded z-depth-1" alt="artist picture"></th>
                <td class="align-middle">Michael Jackson</td>
                <td class="align-middle">
                  <a class="btn btn-light-blue waves-effect waves-light btn-sm" href="./#/artist"><i class="fa fa-search mr-1"></i>See more</a>
                </td>
              </tr>
              <tr>
                <th scope="row" class="align-middle"><img src="http://www.lovemarks.com/wp-content/uploads/lovemark-michael-jackson-standard-600x600.jpg" class="img-fluid table-icon rounded z-depth-1" alt="artist picture"></th>
                <td class="align-middle">Michael Jackson</td>
                <td class="align-middle">
                  <a class="btn btn-light-blue waves-effect waves-light btn-sm" href="./#/artist"><i class="fa fa-search mr-1"></i>See more</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="tab-pane fade" id="panel2" role="tabpanel">
          <table class="table text-center" id="table-list-all-albums">
            <tbody>
            <tr>
              <th scope="row" class="align-middle"><img src="https://upload.wikimedia.org/wikipedia/en/9/91/Xscape.png" class="img-fluid table-icon" alt="album picture"></th>
              <td class="align-middle">Xscape</td>
              <td class="align-middle"><a class="btn btn-light-blue waves-effect waves-light btn-sm" href="./#/album"><i class="fa fa-search mr-1"></i>See more</a></td>
            </tr>
            <tr>
              <th scope="row" class="align-middle"><img src="https://upload.wikimedia.org/wikipedia/en/8/8f/Michaelalbumcover.jpg" class="img-fluid table-icon" alt="album picture"></th>
              <td class="align-middle">Michael</td>
              <td class="align-middle"><a class="btn btn-light-blue waves-effect waves-light btn-sm disabled" href="./#/album"><i class="fa fa-search mr-1"></i>See more</a></td>
            </tr>
            <tr>
              <th scope="row" class="align-middle"><img src="https://upload.wikimedia.org/wikipedia/en/9/98/Mjinvincible.jpg" class="img-fluid table-icon" alt="album picture"></th>
              <td class="align-middle">Invincible</td>
              <td class="align-middle"><a class="btn btn-light-blue waves-effect waves-light btn-sm disabled" href="./#/album"><i class="fa fa-search mr-1"></i>See more</a></td>
            </tr>
            </tbody>
          </table>
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
</template>

<style>

</style>
