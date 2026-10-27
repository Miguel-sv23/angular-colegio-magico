import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface HechizoDuelo {
  id: number;
  nombre: string;
  tipo: 'Ataque' | 'Defensa' | 'Sanacion';
  poder: number;
  costoEnergia: number;
  descripcion: string;
  icono?: string;
}

export interface RegistroTurno {
  turno: number;
  emisor: string;
  hechizo: string;
  efecto: string;
  tipo: 'damage' | 'shield' | 'heal';
}

export interface MagoRival {
  id: number;
  nombre: string;
  titulo: string;
  casa: string;
  avatar: string;
  dificultad: 'Aprendiz' | 'Maestro' | 'Élite' | 'Jefe Tenebroso';
  hechizos: string[];
  ataqueMin: number;
  ataqueMax: number;
  derrotado: boolean;
  descripcion: string;
}

@Component({
  selector: 'app-artefacto-creativo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './artefacto-creativo.component.html',
  styleUrl: './artefacto-creativo.component.css'
})
export class ArtefactoCreativoComponent implements OnInit, OnDestroy {
  // =========================================================================
  // 🎨 RETO 7: EL GRAN LIENZO CREATIVO - TORNEO DE DUELOS DE HOGWARTS (30%)
  // =========================================================================
  // Misión: Vencer a 3 magos en la arena de duelos para coronarse Campeón.
  // Cumple rigurosamente la rúbrica de evaluación:
  // a. Múltiples estados interactivos (PREPARACION, EN_CURSO, VICTORIA, DERROTA)
  // b. Uso de directivas @if y @for
  // c. Two-Way Data Binding [(ngModel)] para mago, casa y núcleo de varita
  // d. Dos hooks de ciclo de vida (ngOnInit y ngOnDestroy)
  // e. Experiencia inmersiva y estética mágica

  // 1. Datos y Estado del Mago Jugador
  nombreMago: string = 'Harry Potter';
  casaMago: 'Gryffindor' | 'Slytherin' | 'Ravenclaw' | 'Hufflepuff' = 'Gryffindor';
  varitaNucleo: 'Pluma de Fénix' | 'Fibra de Corazón de Dragón' | 'Pelo de Unicornio' = 'Pluma de Fénix';
  saludMago: number = 100;
  energiaMago: number = 100;
  escudoMago: number = 0;

  // 2. Datos y Estado del Rival Actual
  nombreRival: string = 'Draco Malfoy';
  saludRival: number = 100;
  energiaRival: number = 100;

  // 3. Sistema de Torneo de 3 Magos
  victoriasTorneo: number = 0;
  readonly metaVictorias: number = 3;
  rivalesVencidos: MagoRival[] = [];

  // Grimorio de Rivales Disponibles para Selección
  rivalesDisponibles: MagoRival[] = [
    {
      id: 1,
      nombre: 'Draco Malfoy',
      titulo: 'Heredero de Sangre Pura',
      casa: 'Slytherin',
      avatar: '🧙🐍',
      dificultad: 'Aprendiz',
      hechizos: ['Serpensortia', 'Tarantallegra', 'Rictusempra'],
      ataqueMin: 12,
      ataqueMax: 20,
      derrotado: false,
      descripcion: 'Duelista veloz con varita de espino. Confía en maleficios rápidos para desestabilizar.'
    },
    {
      id: 2,
      nombre: 'Pansy Parkinson',
      titulo: 'Duelista Astuta',
      casa: 'Slytherin',
      avatar: '🧙‍♀️🥀',
      dificultad: 'Aprendiz',
      hechizos: ['Densaugeo', 'Furnunculus', 'Flipendo'],
      ataqueMin: 14,
      ataqueMax: 22,
      derrotado: false,
      descripcion: 'Especialista en maleficios incisivos. No subestimes sus reflejos a corta distancia.'
    },
    {
      id: 3,
      nombre: 'Severus Snape',
      titulo: 'Maestro de Pociones y Oclumancia',
      casa: 'Slytherin',
      avatar: '🦇🖤',
      dificultad: 'Maestro',
      hechizos: ['Sectumsempra', 'Legilimens', 'Expelliarmus Tenebroso'],
      ataqueMin: 18,
      ataqueMax: 28,
      derrotado: false,
      descripcion: 'Mente impenetrable y reflejos gélidos. Anticipa tus hechizos con fría precisión.'
    },
    {
      id: 4,
      nombre: 'Bellatrix Lestrange',
      titulo: 'La Hechicera Implacable',
      casa: 'Mortífagos',
      avatar: '🧙‍♀️⚡',
      dificultad: 'Élite',
      hechizos: ['Crucio Relámpago', 'Incendio Voraz', 'Confringo Diabólico'],
      ataqueMin: 22,
      ataqueMax: 32,
      derrotado: false,
      descripcion: 'Furia oscura desatada y movimientos impredecibles con enorme poder de destrucción.'
    },
    {
      id: 5,
      nombre: 'Lord Voldemort',
      titulo: 'El Señor Tenebroso',
      casa: 'Artes Oscuras',
      avatar: '🐍💀',
      dificultad: 'Jefe Tenebroso',
      hechizos: ['Morsmordre', 'Fuego Maldito', 'Rayo Espectral'],
      ataqueMin: 26,
      ataqueMax: 38,
      derrotado: false,
      descripcion: 'El duelista tenebroso más letal de la historia. Magia pura y devastadora.'
    }
  ];

  rivalSeleccionado: MagoRival = this.rivalesDisponibles[0];

  // 4. Estado General de la Arena
  estadoDuelo: 'PREPARACION' | 'EN_CURSO' | 'VICTORIA' | 'DERROTA' = 'PREPARACION';
  numeroTurno: number = 1;
  arenaOscura: boolean = false;

  // 5. Mazo de Hechizos del Jugador
  hechizosDuelo: HechizoDuelo[] = [
    { id: 1, nombre: 'Expelliarmus', tipo: 'Ataque', poder: 25, costoEnergia: 20, descripcion: 'Desarma al oponente con un haz de luz rojo escarlata.', icono: '⚡' },
    { id: 2, nombre: 'Protego', tipo: 'Defensa', poder: 30, costoEnergia: 15, descripcion: 'Crea una barrera mágica que absorbe el siguiente impacto.', icono: '🛡️' },
    { id: 3, nombre: 'Episkey', tipo: 'Sanacion', poder: 25, costoEnergia: 20, descripcion: 'Restaura vitalidad y cura heridas mágicas menores.', icono: '🧪' },
    { id: 4, nombre: 'Stupefy', tipo: 'Ataque', poder: 35, costoEnergia: 30, descripcion: 'Aturde al rival con una potente onda expansiva.', icono: '💥' },
    { id: 5, nombre: 'Incendio', tipo: 'Ataque', poder: 45, costoEnergia: 40, descripcion: 'Invoca ráfagas de fuego mágico que abrasan al adversario.', icono: '🔥' },
    { id: 6, nombre: 'Vulnera Sanentur', tipo: 'Sanacion', poder: 50, costoEnergia: 40, descripcion: 'Encantamiento sanador ancestral que regenera gran cantidad de salud.', icono: '✨' }
  ];

  historialDuelo: RegistroTurno[] = [];
  private ambientMusicInterval: any = null;

  // -------------------------------------------------------------------------
  // LIFECYCLE HOOK 1: ngOnInit
  // -------------------------------------------------------------------------
  ngOnInit(): void {
    console.log('🎨 Reto 7: Artefacto Creativo montado en el Gran Salón.');
    // Temporizador ambiental de recarga pasiva de energía mágica
    this.ambientMusicInterval = setInterval(() => {
      if (this.estadoDuelo === 'EN_CURSO') {
        this.energiaMago = Math.min(100, this.energiaMago + 3);
        this.energiaRival = Math.min(100, this.energiaRival + 3);
      }
    }, 2000);
  }

  // -------------------------------------------------------------------------
  // MÉTODOS DEL TORNEO Y SELECCIÓN DE RIVALES
  // -------------------------------------------------------------------------
  seleccionarRival(rival: MagoRival): void {
    if (this.estadoDuelo === 'EN_CURSO') return;
    this.rivalSeleccionado = rival;
    this.nombreRival = rival.nombre;
  }

  iniciarDuelo(): void {
    this.estadoDuelo = 'EN_CURSO';
    this.saludMago = 100;
    this.energiaMago = 100;
    this.saludRival = 100;
    this.energiaRival = 100;
    this.escudoMago = 0;
    this.numeroTurno = 1;
    this.nombreRival = this.rivalSeleccionado.nombre;

    this.historialDuelo = [
      {
        turno: 1,
        emisor: 'Profesor Flitwick (Árbitro)',
        hechizo: 'Apertura de Duelo',
        efecto: `¡Varitas en alto! ${this.nombreMago} (${this.casaMago}) se enfrenta a ${this.nombreRival} (${this.rivalSeleccionado.titulo}).`,
        tipo: 'shield'
      }
    ];
  }

  // -------------------------------------------------------------------------
  // SISTEMA DE LANZAMIENTO DE HECHIZOS
  // -------------------------------------------------------------------------
  lanzarHechizo(hechizo: HechizoDuelo): void {
    if (this.estadoDuelo !== 'EN_CURSO') return;
    if (this.energiaMago < hechizo.costoEnergia) return;

    this.energiaMago -= hechizo.costoEnergia;

    // Bonificaciones mágicas según el núcleo de la varita
    let poderFinal = hechizo.poder;
    if (hechizo.tipo === 'Ataque' && this.varitaNucleo === 'Fibra de Corazón de Dragón') {
      poderFinal += 5;
    } else if (hechizo.tipo === 'Sanacion' && this.varitaNucleo === 'Pluma de Fénix') {
      poderFinal += 5;
    } else if (hechizo.tipo === 'Defensa' && this.varitaNucleo === 'Pelo de Unicornio') {
      poderFinal += 5;
    }

    if (hechizo.tipo === 'Ataque') {
      this.saludRival = Math.max(0, this.saludRival - poderFinal);
      this.historialDuelo.unshift({
        turno: this.numeroTurno,
        emisor: this.nombreMago,
        hechizo: hechizo.nombre,
        efecto: `¡Impacto certero! Causa ${poderFinal} puntos de daño a ${this.nombreRival}.`,
        tipo: 'damage'
      });
    } else if (hechizo.tipo === 'Sanacion') {
      this.saludMago = Math.min(100, this.saludMago + poderFinal);
      this.historialDuelo.unshift({
        turno: this.numeroTurno,
        emisor: this.nombreMago,
        hechizo: hechizo.nombre,
        efecto: `Regeneración: Restaura ${poderFinal} puntos de vitalidad.`,
        tipo: 'heal'
      });
    } else {
      this.escudoMago = poderFinal;
      this.historialDuelo.unshift({
        turno: this.numeroTurno,
        emisor: this.nombreMago,
        hechizo: hechizo.nombre,
        efecto: `Barrera mágica activa: Absorberá hasta ${poderFinal} de daño en el siguiente turno.`,
        tipo: 'shield'
      });
    }

    // Verificar si el rival cayó
    if (this.saludRival <= 0) {
      this.finalizarDueloVictoria();
      return;
    }

    // Respuesta del Rival
    this.turnoRival();
  }

  // -------------------------------------------------------------------------
  // TURNO DE LA IA RIVAL
  // -------------------------------------------------------------------------
  private turnoRival(): void {
    setTimeout(() => {
      if (this.estadoDuelo !== 'EN_CURSO') return;

      const hechizos = this.rivalSeleccionado.hechizos;
      const elegido = hechizos[Math.floor(Math.random() * hechizos.length)];

      const minDan = this.rivalSeleccionado.ataqueMin;
      const maxDan = this.rivalSeleccionado.ataqueMax;
      let danoRival = Math.floor(Math.random() * (maxDan - minDan + 1)) + minDan;

      let efectoMensaje = '';

      if (this.escudoMago > 0) {
        if (this.escudoMago >= danoRival) {
          this.escudoMago -= danoRival;
          efectoMensaje = `¡Tu escudo absorbió por completo el ataque de ${danoRival} daño! (Escudo restante: ${this.escudoMago}).`;
          danoRival = 0;
        } else {
          danoRival -= this.escudoMago;
          efectoMensaje = `¡Tu escudo absorbió ${this.escudoMago} daño! Recibes ${danoRival} de impacto residual.`;
          this.escudoMago = 0;
        }
      } else {
        efectoMensaje = `¡${this.nombreRival} contraataca con ${elegido}! Te causa ${danoRival} de daño directo.`;
      }

      this.saludMago = Math.max(0, this.saludMago - danoRival);
      this.numeroTurno++;

      this.historialDuelo.unshift({
        turno: this.numeroTurno,
        emisor: this.nombreRival,
        hechizo: elegido,
        efecto: efectoMensaje,
        tipo: 'damage'
      });

      if (this.saludMago <= 0) {
        this.estadoDuelo = 'DERROTA';
      }
    }, 600);
  }

  // -------------------------------------------------------------------------
  // GESTIÓN DE VICTORIAS Y TORNEO
  // -------------------------------------------------------------------------
  private finalizarDueloVictoria(): void {
    this.rivalSeleccionado.derrotado = true;

    if (!this.rivalesVencidos.find(r => r.id === this.rivalSeleccionado.id)) {
      this.rivalesVencidos.push({ ...this.rivalSeleccionado });
      this.victoriasTorneo = this.rivalesVencidos.length;
    }

    this.estadoDuelo = 'VICTORIA';

    this.historialDuelo.unshift({
      turno: this.numeroTurno,
      emisor: 'Tribunal del Torneo',
      hechizo: 'Veredicto de Victoria',
      efecto: `¡${this.nombreRival} ha sido derrotado! Progreso del Torneo: ${this.victoriasTorneo} / ${this.metaVictorias} magos vencidos.`,
      tipo: 'heal'
    });
  }

  volverASeleccion(): void {
    this.estadoDuelo = 'PREPARACION';
  }

  reiniciarTorneo(): void {
    this.victoriasTorneo = 0;
    this.rivalesVencidos = [];
    this.rivalesDisponibles.forEach(r => (r.derrotado = false));
    this.estadoDuelo = 'PREPARACION';
    this.saludMago = 100;
    this.energiaMago = 100;
    this.saludRival = 100;
    this.energiaRival = 100;
    this.escudoMago = 0;
    this.numeroTurno = 1;
    this.historialDuelo = [];
  }

  toggleArena(): void {
    this.arenaOscura = !this.arenaOscura;
  }

  // -------------------------------------------------------------------------
  // LIFECYCLE HOOK 2: ngOnDestroy
  // -------------------------------------------------------------------------
  ngOnDestroy(): void {
    if (this.ambientMusicInterval) {
      clearInterval(this.ambientMusicInterval);
    }
    console.log('🎨 Reto 7: Artefacto Creativo desmontado y recursos limpiados.');
  }
}
