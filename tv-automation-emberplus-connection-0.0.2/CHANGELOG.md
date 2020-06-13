# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### 0.0.2 (2020-06-08)


### Features

* basic type predicate for Parameter interface ([19570fe](https://github.com/nrkno/tv-automation-emberplus-connection/commit/19570fe3709aa5986863099d8ccd3e9d9e390659))
* Ber.Reader converted to TypeScript ([3858f61](https://github.com/nrkno/tv-automation-emberplus-connection/commit/3858f619fabe71cf1f7f48ff0a4295fe2de888e6))
* Ber.Writer converted to TypeScript ([bea3219](https://github.com/nrkno/tv-automation-emberplus-connection/commit/bea3219491cfb7b6a0c88ccb0a581955f406a916))
* convert error classes to typescript ([adb4cc4](https://github.com/nrkno/tv-automation-emberplus-connection/commit/adb4cc4bc94911c6c130b53cc52d87714385f3b8))
* create library index ([fc9d513](https://github.com/nrkno/tv-automation-emberplus-connection/commit/fc9d513c522c1dafe15da78365d34961a7c32caa))
* forgiving decoder ([03c72c5](https://github.com/nrkno/tv-automation-emberplus-connection/commit/03c72c5e2875d0e97df817ad3a088ae59adf8197))
* hack setValue to immediately resolve - added setValueWithHacksaw() function from NRKNO fork ([3b382b7](https://github.com/nrkno/tv-automation-emberplus-connection/commit/3b382b7352dfde79e295b94956f1f76a765dd5e8))
* library skeleton ([5d0c922](https://github.com/nrkno/tv-automation-emberplus-connection/commit/5d0c922012a6ae55b3bba843af4da6f763061666))
* reconnection logic (ported from nrkno/develop branch) ([232d508](https://github.com/nrkno/tv-automation-emberplus-connection/commit/232d5086cc3644297d961c1e0a2b5ad1446a45d4))
* remove creation of a new reader for each tag ([e64d11d](https://github.com/nrkno/tv-automation-emberplus-connection/commit/e64d11dfcae956e137f69e2a17d591da757fd19d))
* resends, timeouts, refactor for collections ([138241d](https://github.com/nrkno/tv-automation-emberplus-connection/commit/138241d1ac6af8ee4a1a10ab4b45ed85e9f808b9))
* separate method for ber encoding ember+ data structures ([4b9f947](https://github.com/nrkno/tv-automation-emberplus-connection/commit/4b9f9471024e7c915be71c371b3ed719c3be541f))
* setValueNoAck - rename of function and cleanup ([82618c3](https://github.com/nrkno/tv-automation-emberplus-connection/commit/82618c3ccc13b6355c893a47bafd1d226c7e86ae))
* type predicate function for EmberElement interface ([331f623](https://github.com/nrkno/tv-automation-emberplus-connection/commit/331f623eee4583c8b13f6b53f3dee1ade7c48638))
* **ber encoding:** Adds type to Ember.ParameterContents objects. Allows for explicitly setting Real ParameterContents types to enforce correct encoding. ([153eed8](https://github.com/nrkno/tv-automation-emberplus-connection/commit/153eed853b31eeaf5f79b76bf603ba01e2c4e177))
* **Functions:** Adds Invoke method for QualifiedFunctions with InvocationResult. ([9013dfe](https://github.com/nrkno/tv-automation-emberplus-connection/commit/9013dfea6b2392ca97f6e4423a3a98d5b6f087bb))


### Bug Fixes

* add missing code, pass tests ([dd3d884](https://github.com/nrkno/tv-automation-emberplus-connection/commit/dd3d88430f421b43f9f3b613cfccc2e0beb4ab2e))
* better error message for getEleByPath ([8c1c5be](https://github.com/nrkno/tv-automation-emberplus-connection/commit/8c1c5bee5f95e13298fe318af1be00349c34a92d))
* changes is an array [publish] ([f41e58d](https://github.com/nrkno/tv-automation-emberplus-connection/commit/f41e58d832ed6a19d5220eba04c4b54427d0a482))
* convert tree arrays into collections ([6974cc9](https://github.com/nrkno/tv-automation-emberplus-connection/commit/6974cc9085fee76e9cf30f980c32c6a374de8f41))
* do not expand functions and offline nodes ([fad784e](https://github.com/nrkno/tv-automation-emberplus-connection/commit/fad784e3cef4d635021fc8a2774a03ee30117a5c))
* fix Ber writeReal and writeValue ([d39e90a](https://github.com/nrkno/tv-automation-emberplus-connection/commit/d39e90a746f5c41ff45f8f08231c5885b22bbc2c))
* getDirectory on node should auto subscribe to child modification ([66578f0](https://github.com/nrkno/tv-automation-emberplus-connection/commit/66578f008ab3f7c127bdcfbb1dc2247deb675a77))
* handle indefinite lengths and empty contents ([34f7ff3](https://github.com/nrkno/tv-automation-emberplus-connection/commit/34f7ff3bd90345126ff92e1ffc6b9b617e5f6e55))
* make linting job actually work ([d7eef92](https://github.com/nrkno/tv-automation-emberplus-connection/commit/d7eef926fc864324b1dc9b10c63c6faf02d372a1))
* missing continue for error recovery ([9b3935f](https://github.com/nrkno/tv-automation-emberplus-connection/commit/9b3935f91e6a02173eefe48b796b5f118f1ee720))
* missing skipNext for error recovery ([53b7434](https://github.com/nrkno/tv-automation-emberplus-connection/commit/53b74344c5a644a95112bb049f30ab1881cf3216))
* promise didn´t resolve ([9110000](https://github.com/nrkno/tv-automation-emberplus-connection/commit/91100007882c08b814b84424726ea21543e4345d))
* reading and writing NULL values ([fcf979e](https://github.com/nrkno/tv-automation-emberplus-connection/commit/fcf979eb78a5c8acecbc83f3e6a2cc947fb4c3d0))
* write zero-length buffers and null parameters ([d910ef6](https://github.com/nrkno/tv-automation-emberplus-connection/commit/d910ef64a8426d6c90d24d54603642a74344c1e7))
* **ber encoding:** Fixed unecessary nesting of ParameterContents if using strong typed ParameterContents ([1661251](https://github.com/nrkno/tv-automation-emberplus-connection/commit/16612512a242232f9595c02265d16e7efbe77d61))
* **KeepAliveRequest:** Fixes broken KeepAlieveRequest. ([8a99bb6](https://github.com/nrkno/tv-automation-emberplus-connection/commit/8a99bb624c695f76bf9ae30b3a0d63e413bdcd52))
