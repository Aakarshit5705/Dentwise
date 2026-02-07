import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface AppointmentConfirmationEmailProps {
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: string;
  duration: string;
  price: string;
}

function AppointmentConfirmationEmail({
  doctorName,
  appointmentDate,
  appointmentTime,
  appointmentType,
  duration,
  price,
}: AppointmentConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your dental appointment is confirmed</Preview>

      <Body style={main}>
        <Container style={container}>

          {/* HERO HEADER */}
          <Section style={hero}>
            <Img
              src="https://i.ibb.co.com/tRy6cC2/logo.png"
              width="40"
              height="40"
              alt="DentWise"
              style={{ margin: "0 auto" }}
            />
            <Heading style={heroTitle}>Appointment Confirmed 🦷</Heading>
            <Text style={heroSubtitle}>
              Your booking has been successfully scheduled
            </Text>
          </Section>

          {/* CARD */}
          <Section style={card}>
            <Text style={intro}>
              Here are your appointment details:
            </Text>

            <Row label="Doctor" value={doctorName} />
            <Row label="Appointment Type" value={appointmentType} />
            <Row label="Date" value={appointmentDate} />
            <Row label="Time" value={appointmentTime} />
            <Row label="Duration" value={duration} />
            <Row label="Cost" value={price} />
            <Row label="Location" value="Dental Center" />

            <Section style={ctaWrap}>
              <Link
                href={process.env.NEXT_PUBLIC_APP_URL + "/appointments"}
                style={button}
              >
                View My Appointments
              </Link>
            </Section>

            <Text style={note}>
              Please arrive 15 minutes early. For rescheduling or cancellations,
              contact us at least 24 hours before your appointment.
            </Text>
          </Section>

          {/* FOOTER */}
          <Text style={footer}>
            DentWise • support@dentwise.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default AppointmentConfirmationEmail;

/* ---------- ROW COMPONENT ---------- */
function Row({ label, value }: { label: string; value: string }) {
  return (
    <Section style={row}>
      <Text style={rowLabel}>{label}</Text>
      <Text style={rowValue}>{value}</Text>
    </Section>
  );
}

/* ---------- STYLES ---------- */

const main = {
  backgroundColor: "#eef2ff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 0",
  maxWidth: "560px",
};

const hero = {
  background: "linear-gradient(135deg,#2563eb,#1e40af)",
  padding: "40px 30px",
  borderRadius: "16px 16px 0 0",
  textAlign: "center" as const,
  color: "#ffffff",
};

const heroTitle = {
  fontSize: "26px",
  fontWeight: "700",
  margin: "16px 0 6px",
  color: "#ffffff",
};

const heroSubtitle = {
  fontSize: "15px",
  opacity: 0.9,
  margin: "0",
};

const card = {
  backgroundColor: "#ffffff",
  padding: "34px",
  borderRadius: "0 0 16px 16px",
  boxShadow: "0 12px 32px rgba(0,0,0,0.06)",
};

const intro = {
  fontSize: "16px",
  color: "#374151",
  marginBottom: "24px",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  borderBottom: "1px solid #f1f5f9",
  padding: "12px 0",
};

const rowLabel = {
  fontSize: "14px",
  color: "#6b7280",
};

const rowValue = {
  fontSize: "15px",
  fontWeight: "600",
  color: "#111827",
};

const ctaWrap = {
  textAlign: "center" as const,
  margin: "32px 0 20px",
};

const button = {
  backgroundColor: "#2563eb",
  color: "#ffffff",
  fontWeight: "600",
  padding: "14px 28px",
  borderRadius: "8px",
  textDecoration: "none",
  display: "inline-block",
};

const note = {
  fontSize: "14px",
  color: "#6b7280",
  lineHeight: "22px",
  marginTop: "20px",
};

const footer = {
  textAlign: "center" as const,
  marginTop: "24px",
  fontSize: "13px",
  color: "#9ca3af",
};
