<script setup lang="ts">
// Personal information - you can customize these values
const personalInfo = {
  name: 'Lachlan Williams',
  title: 'Software Developer',
  location: 'Australia',
  email: 'lachlan@example.com',
  github: 'https://github.com/LachlanWilliams',
  linkedin: 'https://linkedin.com/in/lachlanwilliams'
}

const skills = [
  'JavaScript/TypeScript',
  'Vue.js',
  'React',
  'Node.js',
  'Python',
  'Git',
  'Docker',
  'AWS'
]

const experience = [
  {
    role: 'Senior Software Developer',
    company: 'Tech Company',
    period: '2022 - Present',
    description: 'Led development of web applications using modern frameworks and cloud technologies.'
  },
  {
    role: 'Full Stack Developer',
    company: 'Startup Inc',
    period: '2020 - 2022',
    description: 'Built scalable web applications and implemented CI/CD pipelines.'
  }
]

const education = [
  {
    degree: 'Bachelor of Computer Science',
    institution: 'University Name',
    year: '2020'
  }
]
</script>

<template>
  <main class="resume-container">
    <!-- Header Section -->
    <header class="header">
      <div class="profile-info">
        <h1 class="name">{{ personalInfo.name }}</h1>
        <h2 class="title">{{ personalInfo.title }}</h2>
        <p class="location">📍 {{ personalInfo.location }}</p>
      </div>
      <div class="contact-info">
        <a :href="`mailto:${personalInfo.email}`" class="contact-link">
          📧 {{ personalInfo.email }}
        </a>
        <a :href="personalInfo.github" target="_blank" class="contact-link">
          🐙 GitHub
        </a>
        <a :href="personalInfo.linkedin" target="_blank" class="contact-link">
          💼 LinkedIn
        </a>
      </div>
    </header>

    <!-- About Section -->
    <section class="section">
      <h3 class="section-title">About Me</h3>
      <p class="about-text">
        I'm a passionate software developer with experience in building modern web applications. 
        I love working with cutting-edge technologies and solving complex problems. 
        When I'm not coding, you can find me exploring new technologies or contributing to open-source projects.
      </p>
    </section>

    <!-- Skills Section -->
    <section class="section">
      <h3 class="section-title">Skills</h3>
      <div class="skills-grid">
        <span v-for="skill in skills" :key="skill" class="skill-tag">
          {{ skill }}
        </span>
      </div>
    </section>

    <!-- Experience Section -->
    <section class="section">
      <h3 class="section-title">Experience</h3>
      <div class="experience-list">
        <div v-for="job in experience" :key="job.role" class="experience-item">
          <div class="job-header">
            <h4 class="job-title">{{ job.role }}</h4>
            <span class="job-period">{{ job.period }}</span>
          </div>
          <p class="company-name">{{ job.company }}</p>
          <p class="job-description">{{ job.description }}</p>
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section class="section">
      <h3 class="section-title">Education</h3>
      <div class="education-list">
        <div v-for="edu in education" :key="edu.degree" class="education-item">
          <h4 class="degree">{{ edu.degree }}</h4>
          <p class="institution">{{ edu.institution }}</p>
          <p class="year">{{ edu.year }}</p>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.resume-container {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
  color: #1a202c;
  text-align: center;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 2.5rem;
  text-align: center;
}

.name {
  font-size: 3rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.025em;
}

.title {
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0 0 1rem 0;
  opacity: 0.9;
}

.location {
  font-size: 1.1rem;
  margin: 0 0 2rem 0;
  opacity: 0.8;
}

.contact-info {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.contact-link {
  text-decoration: none;
  color: white;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
}

.contact-link:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.section {
  padding: 2.5rem;
  border-bottom: 1px solid #e2e8f0;
  text-align: left;
}

.section:last-child {
  border-bottom: none;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 1.5rem 0;
  position: relative;
  padding-bottom: 0.75rem;
  text-align: center;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
}

.about-text {
  font-size: 1.1rem;
  color: #4a5568;
  line-height: 1.7;
  margin: 0;
  text-align: center;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  max-width: 700px;
  margin: 0 auto;
}

.skill-tag {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.skill-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.experience-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 700px;
  margin: 0 auto;
}

.experience-item {
  padding: 2rem;
  background: #f8fafc;
  border-radius: 12px;
  border-left: 4px solid #667eea;
  transition: all 0.2s ease;
  text-align: left;
}

.experience-item:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.job-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.job-period {
  font-size: 0.95rem;
  color: #667eea;
  font-weight: 600;
  background: rgba(102, 126, 234, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  white-space: nowrap;
}

.company-name {
  font-size: 1.1rem;
  color: #667eea;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
}

.job-description {
  color: #4a5568;
  margin: 0;
  line-height: 1.6;
  font-size: 1rem;
}

.education-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 700px;
  margin: 0 auto;
}

.education-item {
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
  text-align: center;
}

.education-item:hover {
  border-color: #667eea;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.degree {
  font-size: 1.25rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 0.5rem 0;
}

.institution {
  font-size: 1.1rem;
  color: #667eea;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.year {
  font-size: 0.95rem;
  color: #718096;
  font-weight: 500;
  margin: 0;
}

@media (max-width: 768px) {
  .resume-container {
    margin: 0;
    border-radius: 0;
  }
  
  .header {
    padding: 2rem 1.5rem;
  }
  
  .name {
    font-size: 2.25rem;
  }
  
  .contact-info {
    flex-direction: column;
    gap: 1rem;
  }
  
  .section {
    padding: 2rem 1.5rem;
  }
  
  .job-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .skills-grid {
    gap: 0.75rem;
  }
  
  .skill-tag {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
  
  .experience-list,
  .education-list,
  .skills-grid {
    max-width: 100%;
  }
}
</style>
