import { reactive } from "../../node_modules/vue";
import { Unit } from "./unit";

export class ParticleUnitDefs {
  static particles = reactive([
    new Unit(1, "Photon", 1, -1, 1, 1),
    new Unit(2, "Quark", 10, 10, 0.8, 1.5),
    new Unit(3, "Proton", 100, 9, 0.7, 1.25),
    new Unit(4, "Neutron", 1e4, 8, 0.6, 1),
    new Unit(5, "Hydrogen", 1e6, 7, 0.5, 0.75),
    new Unit(6, "Helium", 1e9, 6, 0.4, 0.5),
    new Unit(7, "Molecular Cloud", 1e12, 5, 0.3, 0.25),
    new Unit(8, "Protostar", 1e16, 4, 0.2, 0.1),
  ]);
}
