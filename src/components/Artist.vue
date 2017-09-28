<template>
  <div class="container content">
    <div class="row">
      <div class="col-md-3 hm-black-strong">
        <a href="https://itunes.apple.com/ca/artist/michael-jackson/id32940" target="_blank">
          <div class="view overlay hm-zoom z-depth-2 rounded mb-4">
            <img src="http://www.lovemarks.com/wp-content/uploads/lovemark-michael-jackson-standard-600x600.jpg" class="img-fluid" alt="artist picture">
            <div class="mask flex-center waves-effect waves-light">
              <p class="white-text">See on iTunes</p>
            </div>
          </div>
        </a>
      </div>
      <div class="col-md-9">
        <h2>Michael Jackson</h2>
        <h3 class="light-blue-text"><em>Pop</em></h3>
        <div class="row">
          <div class="col-md-3">
             <a href="https://itunes.apple.com/ca/artist/michael-jackson/id32940" target="_blank" class="hoverable rounded" style="display:inline-block;overflow:hidden;background:url(//linkmaker.itunes.apple.com/assets/shared/badges/en-us/music-lrg.svg) no-repeat;width:110px;height:40px;background-size:contain;"></a>
          </div>
        </div>
      </div>
    </div>
    <div class="card mt-4 mb-4 animated fadeIn">
      <div class="card-body">
        <table class="table table-hover">
          <thead>
          <tr class="light-blue-text">
            <th>#</th>
            <th>Album</th>
            <th>Date</th>
            <th>Tracks</th>
            <th>Duration</th>
          </tr>
          </thead>
          <tbody>
          <tr onclick="document.location ='./#/album';">
            <th scope="row">1</th>
            <td>Xscape</td>
            <td>2014</td>
            <td>8</td>
            <td>32:25</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Michael</td>
            <td>2010</td>
            <td>10</td>
            <td>42:13</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Invincible</td>
            <td>2001</td>
            <td>16</td>
            <td>76:08</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style>
  .table-hover tbody tr:hover td, .table-hover tbody tr:hover th {
    background-color: RGB(130,177,255);
    color: white;
    cursor: pointer;
  }
</style>
