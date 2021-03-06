# Change these
server '138.197.134.47', port: 22, roles: [:web, :app, :db], primary: true

set :branch, :deploy #added to deploy on alternate branches
set :repository, "git@github.com:mulvster/half_up_front.git"

set :repo_url,        'git@github.com:NoamAscher/half_up_front.git'
set :application,     'half_up_front'
set :user,            'deploy'
set :puma_threads,    [4, 16]
set :puma_workers,    0

# Don't change these unless you know what you're doing
set :pty,             true
set :use_sudo,        false
set :stage,           :production
set :deploy_via,      :remote_cache
set :deploy_to,       "/home/#{fetch(:user)}/apps/#{fetch(:application)}"
set :puma_bind,       "unix://#{shared_path}/tmp/sockets/#{fetch(:application)}-puma.sock"
set :puma_state,      "#{shared_path}/tmp/pids/puma.state"
set :puma_pid,        "#{shared_path}/tmp/pids/puma.pid"
set :puma_access_log, "#{release_path}/log/puma.error.log"
set :puma_error_log,  "#{release_path}/log/puma.access.log"
set :ssh_options,     { forward_agent: true, user: fetch(:user), keys: %w(~/.ssh/id_rsa.pub) }
set :puma_preload_app, true
set :puma_worker_timeout, nil
set :puma_init_active_record, true  # Change to false when not using ActiveRecord

## Defaults:
# set :scm,           :git
# set :branch,        :master
# set :format,        :pretty
# set :log_level,     :debug
# set :keep_releases, 5

## Linked Files & Directories (Default None):
# set :linked_files, %w{config/database.yml}
# set :linked_dirs,  %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

namespace :puma do
  desc 'Create Directories for Puma Pids and Socket'
  task :make_dirs do
    on roles(:app) do
      execute "mkdir #{shared_path}/tmp/sockets -p"
      execute "mkdir #{shared_path}/tmp/pids -p"
    end
  end

  before :start, :make_dirs
end

namespace :deploy do
  desc "Make sure local git is in sync with remote."
  task :check_revision do
    on roles(:app) do
      unless `git rev-parse HEAD` == `git rev-parse origin/master`
        puts "WARNING: HEAD is not the same as origin/master"
        puts "Run `git push` to sync changes."
        exit
      end
    end
  end

  desc 'Initial Deploy'
  task :initial do
    on roles(:app) do
      before 'deploy:restart', 'puma:start'
      invoke 'deploy'
    end
  end

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      invoke 'puma:restart'
    end
  end

  # namespace :assets do
  #   desc "Precompile assets"
  #   task :precompile do
  #     on roles(fetch(:assets_roles)) do
  #       within release_path do
  #         with rails_env: fetch(:rails_env) do
  #           begin
  #             # find the most recent release
  #             latest_release = capture(:ls, '-xr', releases_path).split[1]

  #             # precompile if this is the first deploy
  #             raise PrecompileRequired unless latest_release

  #             latest_release_path = releases_path.join(latest_release)

  #             # precompile if the previous deploy failed to finish precompiling
  #             execute(:ls, latest_release_path.join('assets_manifest_backup')) rescue raise(PrecompileRequired)

  #             fetch(:assets_dependencies).each do |dep|
  #               # execute raises if there is a diff
  #               execute(:diff, '-Naur', release_path.join(dep), latest_release_path.join(dep)) rescue raise(PrecompileRequired)
  #             end

  #             info("Skipping asset precompile, no asset diff found")

  #             # copy over all of the assets from the last release
  #             execute(:cp, '-r', latest_release_path.join('public', fetch(:assets_prefix)), release_path.join('public', fetch(:assets_prefix)))
  #           rescue PrecompileRequired
  #             execute(:rake, "assets:precompile")
  #           end
  #         end
  #       end
  #     end
  #   end
  # end


  before :starting,     :check_revision
  after  :finishing,    :compile_assets
  after  :finishing,    :cleanup
  after  :finishing,    :restart
end

# ps aux | grep puma    # Get puma pid
# kill -s SIGUSR2 pid   # Restart puma
# kill -s SIGTERM pid   # Stop puma

