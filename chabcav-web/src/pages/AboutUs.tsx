import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10">
      {/* About Section */}
      <section>
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="mb-3">
          This platform is made possible through the collaboration of individuals and organizations who share a passion for preserving and promoting the rich history and culture of Cavite.
        </p>
        <ul className="list-disc list-inside space-y-2 text-lg">
          <li><strong>Mrs. Remedios Ordoñez</strong> – A dedicated historian and advocate for Cavite's cultural heritage.</li>
          <li><strong>Cavite City</strong> – A historically significant location in the Philippines, known for its role in national events.</li>
          <li><strong>Cavite Tourism Department</strong> – Supporting the promotion and development of historical and cultural sites.</li>
          <li><strong>Cavite Historical Society</strong> – An organization committed to preserving Cavite’s historical identity.</li>
        </ul>
      </section>

     
    </div>
  );
};

export default AboutUs;
