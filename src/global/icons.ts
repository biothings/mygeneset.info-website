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
    far.faUser,
    fas.faAngleDoubleDown,
    fas.faAngleDoubleUp,
    fas.faAngleLeft,
    fas.faAngleRight,
    fas.faBars,
    fas.faBook,
    fas.faBook,
    fas.faCheckCircle,
    fas.faCheckSquare,
    fas.faCode,
    fas.faDatabase,
    fas.faDna,
    fas.faDownload,
    fas.faExclamationCircle,
    fas.faExclamationTriangle,
    fas.faGraduationCap,
    fas.faHammer,
    fas.faLink,
    fas.faPersonRunning,
    fas.faPlay,
    fas.faSchool,
    fas.faSearch,
    fas.faSignature,
    fas.faSignInAlt,
    fas.faTimes,
  ] as Array<IconDefinition>)
);
