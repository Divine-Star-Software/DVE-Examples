import { DAE } from "../DivineAudioEngine.js";
export const EffectsManager = {
    builtInReverbBuffers: {},
    customReverbBuffers: {},
    async preloadReverbBuffers(builtInReverbs, customReverbs) {
        for (const rid of builtInReverbs) {
            const path = DAE.constants.getBuiltInReverbPath(rid);
            const buffer = await DAE.api.getAudioBuffer(path);
            this.builtInReverbBuffers[rid] = buffer;
        }
        if (customReverbs) {
            for (const rid of customReverbs) {
                const path = DAE.constants.getCustomReverbPath(rid);
                const buffer = await DAE.api.getAudioBuffer(path);
                this.customReverbBuffers[rid] = buffer;
            }
        }
    },
    _getReverbBuffer(effectsData) {
        if (effectsData.reverb) {
            if (!effectsData.reverb.builtIn && !effectsData.reverb.custom) {
                throw new Error(`Must supply a reverb id.`);
            }
            if (effectsData.reverb.builtIn) {
                const buffer = this.builtInReverbBuffers[effectsData.reverb.builtIn];
                if (!buffer) {
                    throw new Error(`Built-In Reverb: ${effectsData.reverb.builtIn} is not loaded.`);
                }
                return buffer;
            }
            if (effectsData.reverb.custom) {
                const buffer = this.customReverbBuffers[effectsData.reverb.custom];
                if (!buffer) {
                    throw new Error(`Custon Reverb: ${effectsData.reverb.custom} is not loaded.`);
                }
                return buffer;
            }
        }
    },
    getEffectsNode(effectsData, source, master, nodes) {
        if (effectsData.reverb) {
            const buffer = this._getReverbBuffer(effectsData);
            if (buffer) {
                const reverb = DAE.api.createConvolver(buffer);
                const reverbGain = DAE.api.createGain();
                source.connect(reverb);
                reverb.connect(reverbGain);
                reverbGain.gain.value = effectsData.reverb.level;
                reverbGain.connect(master);
                nodes.push(reverb, reverbGain);
            }
        }
    },
};
