import { FS } from 'meteor/cfs:base-package';
import 'meteor/skaro:filesystem'

FS.TempStore.Storage = new FS.Store.FileSystem("_tempstore", {
  internal :  true,
  path : '/mnt/data/tmp',
});
