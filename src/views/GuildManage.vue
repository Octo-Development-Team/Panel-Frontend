<template>
  <div class="guildManage">
    <aside id="left-col" class="uk-light uk-visible@m">
      <div class="left-content-box">
        <img
          src="https://picsum.photos/500/300"
          alt=""
          class="uk-border-circle profile-img"
        />
        <h4 class="uk-text-center uk-margin-remove-vertical text-light">
          John Doe
        </h4>
      </div>

      <div class="left-nav-wrap uk-margin-top">
        <ul class="uk-nav uk-nav-default uk-nav-parent-icon" data-uk-nav>
          <li>
            <a href="#"
              ><span
                data-uk-icon="icon: home"
                class="uk-margin-small-right"
              ></span
              >Home</a
            >
          </li>
          <li>
            <a href="#"
              ><span
                data-uk-icon="icon: cog"
                class="uk-margin-small-right"
              ></span
              >Modules</a
            >
          </li>
          <li>
            <a href="#"
              ><span
                data-uk-icon="icon: list"
                class="uk-margin-small-right"
              ></span
              >Commands</a
            >
          </li>
        </ul>
      </div>
      <div class="bar-bottom">
        <ul
          class="uk-subnav uk-flex uk-flex-center uk-child-width-1-5"
          data-uk-grid
        >
          <li>
            <a
              href="#"
              class="uk-icon-link"
              data-uk-icon="icon: home"
              title="Home"
              data-uk-tooltip
            ></a>
          </li>
          <li>
            <a
              href="#"
              class="uk-icon-link"
              data-uk-icon="icon: settings"
              title="Settings"
              data-uk-tooltip
            ></a>
          </li>
          <li>
            <a
              href="#"
              class="uk-icon-link"
              data-uk-icon="icon: social"
              title="Social"
              data-uk-tooltip
            ></a>
          </li>

          <li>
            <a
              href="#"
              class="uk-icon-link"
              data-uk-tooltip="Sign out"
              data-uk-icon="icon: sign-out"
            ></a>
          </li>
        </ul>
      </div>
    </aside>
    <a
      class="uk-navbar-toggle uk-hidden@m uk-position-top-right uk-position-z-index"
      data-uk-toggle
      data-uk-navbar-toggle-icon
      href="#offcanvas-nav"
    ></a>
    <div id="content" data-uk-height-viewport="expand: true">
      <div class="uk-container uk-container-expand">
        <div
          class="uk-grid uk-grid-divider uk-grid-medium uk-child-width-1-2 uk-child-width-1-4@l uk-child-width-1-5@xl"
          data-uk-grid
        >
          <div>
            <span class="uk-text-small"
              ><span
                data-uk-icon="icon:world"
                class="uk-margin-small-right uk-text-primary"
              ></span
              >Region</span
            >
            <h1 class="uk-heading-primary uk-margin-remove  uk-text-primary">
              Europe
            </h1>
          </div>
          <div>
            <span class="uk-text-small"
              ><span
                data-uk-icon="icon:users"
                class="uk-margin-small-right uk-text-primary"
              ></span
              >Users</span
            >
            <h1 class="uk-heading-primary uk-margin-remove uk-text-primary">
              9,999
            </h1>
            <div class="uk-text-small">
              <span class="uk-text-success" data-uk-icon="icon: triangle-up"
                >+6%</span
              >
            </div>
          </div>
          <div>
            <span class="uk-text-small"
              ><span
                data-uk-icon="icon:hashtag"
                class="uk-margin-small-right uk-text-primary"
              ></span
              >Channels</span
            >
            <h1 class="uk-heading-primary uk-margin-remove  uk-text-primary">
              9,999
            </h1>
          </div>
          <div>
            <span class="uk-text-small"
              ><span
                data-uk-icon="icon:tag"
                class="uk-margin-small-right uk-text-primary"
              ></span
              >Categories</span
            >
            <h1 class="uk-heading-primary uk-margin-remove  uk-text-primary">
              9,999
            </h1>
          </div>
        </div>
        <div class="uk-grid uk-grid-medium" data-uk-grid>
          <div class="uk-width-1-2@l">
            <div
              class="uk-card uk-card-default uk-card-small uk-card-hover uk-border-rounded"
            >
              <div class="uk-card-header">
                <div class="uk-grid uk-grid-small">
                  <div class="uk-width-expand">
                    <h4>Bot Configuration Settings</h4>
                  </div>
                </div>
              </div>
              <div class="uk-card-body">
                <div class="uk-grid-medium" uk-grid>
                  <div>
                    <form action="">
                      <div class="uk-margin">
                        <div class="uk-grid-small" uk-grid>
                          <div>
                            <div class="uk-form-controls">
                              <input
                                class="uk-input uk-width-large"
                                id="nickname"
                                type="text"
                                placeholder="Nickname"
                              />
                            </div>
                          </div>
                          <div>
                            <a href=""
                              ><button
                                class="uk-button primary uk-border-rounded"
                              >
                                Save
                              </button></a
                            >
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="uk-margin-remove-top">
                    <form action="">
                      <div class="uk-margin">
                        <div class="uk-grid-small" uk-grid>
                          <div>
                            <div class="uk-form-controls">
                              <input
                                class="uk-input uk-width-large"
                                id="nickname"
                                type="text"
                                placeholder="Prefix"
                              />
                            </div>
                          </div>
                          <div>
                            <a href=""
                              ><button
                                class="uk-button primary uk-border-rounded"
                              >
                                Save
                              </button></a
                            >
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="uk-width-1-2@l">
            <div
              class="uk-card uk-card-default uk-card-small uk-card-hover uk-border-rounded"
            >
              <div class="uk-card-header">
                <div class="uk-grid uk-grid-small">
                  <div class="uk-width-expand">
                    <h4>Server Listing Information</h4>
                  </div>
                </div>
              </div>
              <div class="uk-card-body">
                <form action="">
                  <label
                    ><input class="uk-checkbox" type="checkbox" /> List on
                    Server List</label
                  >
                  <div class="uk-grid-small uk-margin-top" uk-grid>
                    <div>
                      <div>
                        <label class="uk-form-label" for="form-stacked-text"
                          >Invite URL</label
                        >
                        <div class="uk-form-controls">
                          <input
                            class="uk-input"
                            id="form-stacked-text"
                            type="text"
                            placeholder="discord.gg/octo"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <label class="uk-form-label" for="form-stacked-select"
                          >Server Category</label
                        >
                        <div class="uk-form-controls">
                          <select class="uk-select" id="form-stacked-select">
                            <option>Development</option>
                            <option>Option 02</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <form class="uk-margin-top" action="">
                  <div class="uk-margin">
                    <div class="uk-form-label">Server Description</div>
                    <div class="uk-form-controls">
                      <textarea
                        class="uk-textarea uk-margin-bottom"
                        rows="5"
                        placeholder="Enter the description of your amazing server right in this box!"
                      ></textarea>
                      <a href=""
                        ><button class="uk-button primary uk-border-rounded">
                          Save
                        </button></a
                      >
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="uk-width-1-1@l">
            <div
              class="uk-card uk-card-default uk-card-small uk-card-hover uk-border-rounded"
            >
              <div class="uk-card-header">
                <div class="uk-grid uk-grid-small">
                  <div class="uk-width-expand"><h4>Recent Action Log</h4></div>
                </div>
              </div>
              <div class="uk-card-body">
                <table class="uk-table logs">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Octo#9234</td>
                      <td>25/07/1999</td>
                      <td>Deleted channel named "info" ID: 324679345345</td>
                    </tr>
                    <tr>
                      <td>Octo#9234</td>
                      <td>25/07/1999</td>
                      <td>Deleted channel named "info" ID: 324679345345</td>
                    </tr>
                    <tr>
                      <td>Octo#9234</td>
                      <td>25/07/1999</td>
                      <td>Deleted channel named "info" ID: 324679345345</td>
                    </tr>
                    <tr>
                      <td>Octo#9234</td>
                      <td>25/07/1999</td>
                      <td>Deleted channel named "info" ID: 324679345345</td>
                    </tr>
                    <tr>
                      <td>Octo#9234</td>
                      <td>25/07/1999</td>
                      <td>Deleted channel named "info" ID: 324679345345</td>
                    </tr>
                    <tr>
                      <td>Octo#9234</td>
                      <td>25/07/1999</td>
                      <td>Deleted channel named "info" ID: 324679345345</td>
                    </tr>
                    <tr>
                      <td>Octo#9234</td>
                      <td>25/07/1999</td>
                      <td>Deleted channel named "info" ID: 324679345345</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="offcanvas-nav" data-uk-offcanvas="flip: true; overlay: true">
      <div
        class="uk-offcanvas-bar uk-offcanvas-bar-animation uk-offcanvas-slide"
      >
        <button
          class="uk-offcanvas-close uk-close uk-icon"
          type="button"
          data-uk-close
        ></button>
        <ul class="uk-nav uk-nav-default">
          <li>
            <a href="#"
              ><span
                data-uk-icon="icon: home"
                class="uk-margin-small-right"
              ></span
              >Home</a
            >
          </li>
          <li>
            <a href="#"
              ><span
                data-uk-icon="icon: cog"
                class="uk-margin-small-right"
              ></span
              >Modules</a
            >
          </li>
          <li>
            <a href="#"
              ><span
                data-uk-icon="icon: list"
                class="uk-margin-small-right"
              ></span
              >Commands</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
@import url("../../public/css/uikit.min.css");
@import url("../../public/css/dashboard.css");
@import url("../../public/css/universal.css");
</style>
