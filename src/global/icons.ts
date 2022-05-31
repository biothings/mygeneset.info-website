import { IconDefinition, library } from "@fortawesome/fontawesome-svg-core";
import * as far from "@fortawesome/free-regular-svg-icons";
import * as fas from "@fortawesome/free-solid-svg-icons";
import * as fab from "@fortawesome/free-brands-svg-icons";

// create collection/"palette" of useable icons

library.add(
  ...([
    fab.faGithub,
    fab.faTwitter,
    far.faCircle,
    far.faCircle,
    far.faCircleDot,
    far.faClock,
    far.faComment,
    far.faCopy,
    far.faEnvelope,
    far.faFaceLaughBeam,
    far.faSquare,
    fas.faAngleDoubleDown,
    fas.faAngleDoubleUp,
    fas.faBars,
    fas.faBook,
    fas.faBook,
    fas.faCheckSquare,
    fas.faCode,
    fas.faDatabase,
    fas.faDna,
    fas.faDownload,
    fas.faHammer,
    fas.faLink,
    fas.faPersonRunning,
    fas.faPlay,
    fas.faSearch,
    fas.faSignature,
    fas.faTimes,
  ] as Array<IconDefinition>)
);
