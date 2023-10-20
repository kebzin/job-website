import {
  ArrowsUpFromLine,
  Factory,
  Home,
  Lock,
  LockIcon,
  MailCheck,
  MessageSquare,
  ScrollText,
  Trash,
  Trash2,
  User,
  Users,
} from "lucide-react";

const MyAccountData = [
  {
    icone: <User color="gray" />,
    route: "/dashboard/companyProfile",
    label: "Company Profile",
    employear: true,
  },
  {
    icone: <ArrowsUpFromLine color="gray" />,
    route: "/dashboard/postJob",
    label: "Post a New Job",
    employear: true,
  },
  {
    icone: <ScrollText color="gray" />,
    route: "/dashboard/manageJobs",
    label: "Manage Jobs",
    employear: true,
  },

  {
    icone: <User color="gray" />,
    route: "/dashboard/myProfile",
    label: "My Profile",
    employear: false,
  },
  {
    icone: <ArrowsUpFromLine color="gray" />,
    route: "/employer-account/post-job",
    label: "My Resume",
    employear: false,
  },
  {
    icone: <ScrollText color="gray" />,
    route: "/dashboard/appliedJobs",
    label: "Applied Jobs",
    employear: false,
  },
  {
    icone: <Factory color="gray" />,
    route: "/dashboard/cvManager",
    label: "CV Manager",
    employear: false,
  },
  {
    icone: <MessageSquare color="gray" />,
    route: "/dashboard/notification",
    label: "Notification",
    employear: "default",
  },
  {
    icone: <LockIcon color="gray" />,
    route: "/dashboard/changePassword",
    label: "Change Password",
    employear: "default",
  },
  {
    icone: <Trash2 color="gray" />,
    route: "/employer-account/applicants",
    label: "Delete Profile",
    employear: "default",
  },
];
export default MyAccountData;
